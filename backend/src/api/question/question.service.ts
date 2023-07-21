import natural from "natural";
import { Question } from "../../../../shared/types/question";
import { QuestionModel } from "./question.model";
import { APIFeatures, QueryString } from "../../services/util.service";
import { Document, Query } from "mongoose";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { UserRightAnswerModel } from "../user/user.model";
const SIMILARITY_THRESHOLD = 0.65;

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  if (!loggedinUserId) {
    const { language, level } = queryString;
    const questions = QuestionModel.aggregate([
      {
        $match: {
          language,
          level,
          isArchived: { $ne: true },
        },
      },
      {
        $sample: { size: 25 },
      },
    ]);

    return questions as unknown as Question[];
  }

  const { language, level } = queryString;
  const userRightAnswers = await UserRightAnswerModel.find({
    userId: loggedinUserId,
    level,
    language,
  }).exec();

  const userRightAnswersIds = userRightAnswers.map(userRightAnswer => userRightAnswer.questionId);
  const features = new APIFeatures(QuestionModel.find(), queryString)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const query = features.getQuery() as Query<Question[], Question>;
  query.where("_id").nin(userRightAnswersIds);
  const questions = (await query.exec()) as unknown as Document[];
  return questions as unknown as Question[];
}

async function getById(questionId: string): Promise<Question> {
  const question = await QuestionModel.findById(questionId).exec();
  return question as unknown as Question;
}

async function add(question: Question): Promise<Question> {
  const savedQuestion = await new QuestionModel(question).save();
  return savedQuestion as unknown as Question;
}

async function update(id: string, question: Question): Promise<Question> {
  const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, question, {
    new: true,
    runValidators: true,
  }).exec();
  return updatedQuestion as unknown as Question;
}

async function remove(questionId: string): Promise<Question> {
  const questionRemoved = QuestionModel.findByIdAndRemove(questionId).exec();
  return questionRemoved as unknown as Question;
}

async function archive(questionId: string): Promise<Question> {
  const archivedQuestion = await QuestionModel.findByIdAndUpdate(
    questionId,
    { isArchived: true },
    { new: true }
  ).exec();

  return archivedQuestion as unknown as Question;
}

async function findDuplicatedQuestions(queryString: QueryString): Promise<Question[]> {
  type Duplicate = {
    question1: Question;
    question2: Question;
    similarity: number;
  };

  const features = new APIFeatures(QuestionModel.find(), queryString)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const docs = (await features.getQuery()) as unknown as Document[];
  const convertDocToObj = (doc: Document) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    return obj;
  };
  const questions = docs.map(doc => convertDocToObj(doc)) as Question[];

  const getDuplicates = (questions: Question[]): Duplicate[] => {
    const duplicates = [];
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;

    const tokenizeQuestions = (...questions: string[]): string[][] =>
      questions
        .map(question => tokenizer.tokenize(question))
        .filter(tokens => tokens !== null) as string[][];

    const filterTokens = (...tokens: string[][]): string[][] => {
      const stopWords = natural.stopwords;
      const stopWordSet = new Set(stopWords);
      return tokens.map(tokens => tokens.filter(token => !stopWordSet.has(token)));
    };

    const stemTokens = (...tokens: string[][]): Set<string>[] =>
      tokens.map(tokens => new Set(tokens.map(token => stemmer.stem(token))));

    const calcSimilarity = (stems1: Set<string>, stems2: Set<string>): number => {
      const intersection = new Set([...stems1].filter(stem => stems2.has(stem)));
      const union = new Set([...stems1, ...stems2]);
      return intersection.size / union.size;
    };

    const isDuplicate = (similarity: number): boolean => similarity >= SIMILARITY_THRESHOLD;

    for (let i = 0; i < questions.length; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        const question1 = questions[i];
        const question2 = questions[j];

        const [tokens1, tokens2] = tokenizeQuestions(question1.question, question2.question);
        if (!tokens1 || !tokens2) continue;

        const [filteredTokens1, filteredTokens2] = filterTokens(tokens1, tokens2);
        const [stems1, stems2] = stemTokens(filteredTokens1, filteredTokens2);
        const similarity = calcSimilarity(stems1, stems2);

        if (!isDuplicate(similarity)) continue;

        duplicates.push({ question1, question2, similarity });
      }
    }
    return duplicates.sort((a, b) => b.similarity - a.similarity);
  };

  const getDuplicatedQuestions = (questions: Question[]): Question[] => {
    const duplicates = getDuplicates(questions);

    const uniqueIds = new Set();
    const duplicatedQuestion = duplicates
      .flatMap(duplicate => {
        return [{ ...duplicate.question1 }, { ...duplicate.question2 }];
      })
      .filter(question => {
        if (uniqueIds.has(question.id)) return false;
        uniqueIds.add(question.id);
        return true;
      });

    return duplicatedQuestion;
  };

  return getDuplicatedQuestions(questions);
}

export default {
  query,
  getById,
  add,
  update,
  remove,
  archive,
  findDuplicatedQuestions,
};
