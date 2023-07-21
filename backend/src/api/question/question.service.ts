import natural from "natural";
import { Question } from "../../../../shared/types/question";
import { QuestionModel } from "./question.model";
import { APIFeatures, QueryString } from "../../services/util.service";
import { Document, Query } from "mongoose";
import { asyncLocalStorage } from "../../services/als.service";
import { alStoreType } from "../../middlewares/setupAls.middleware";
import { UserRightAnswerModel } from "../user/user.model";
import { ravenStore } from "../../server";
import { DifficultyLevels, ProgrammingLanguage } from "../../../../shared/types/system";
import { Session } from "inspector";

const SIMILARITY_THRESHOLD = 0.65;

async function getRandomQuestions(language: ProgrammingLanguage, level: DifficultyLevels){
  const session = ravenStore.openSession();
  const query = session.query<Question>({collection: "Questions"})
    .randomOrdering()
    .take(25)
    .skip(0);

  if(language) query.whereEquals("language", language);
  if(level) query.whereEquals("level", level);
  return await query.all();
}


async function getQuestionsForUser(language: ProgrammingLanguage, level: DifficultyLevels, term: string){
  const session = ravenStore.openSession();
  const query = session.query<Question>({collection: "Questions"})
    .take(25)
    .skip(0)
    .orderByScore();

  if(language) query.whereEquals("language", language);
  if(level) query.whereEquals("level", level);
  if(term) query.search("question", term);
  return await query.all();
}

async function query(queryString: QueryString): Promise<Question[]> {
  const store = asyncLocalStorage.getStore() as alStoreType;
  const loggedinUserId = store?.loggedinUserId;
  const { language, level, terms } = queryString;
  // if (!loggedinUserId) {
  //   return await getRandomQuestions(language as ProgrammingLanguage, level as DifficultyLevels);
  // }
  return await getQuestionsForUser(language as ProgrammingLanguage, level as DifficultyLevels, terms as string);
}

async function getById(questionId: string): Promise<Question | null> {
  const session = ravenStore.openSession();
  return await session.load<Question>(questionId);
}

async function add(question: Question): Promise<Question> {
  const session = ravenStore.openSession();
  await session.store(question);
  await session.saveChanges();
  return question;
}

async function setCorrectOption(questionId: string, selection: number) {
  const session = ravenStore.openSession();
  var q = await session.load<Question>(questionId);
  if(q == null)
    return;
  q.correctOption = selection;
  await session.saveChanges();
}

async function update(id: string, question: Question): Promise<Question> {
  return await add(question);
}

async function remove(questionId: string)  {
  const session = ravenStore.openSession();
  session.delete(questionId);
  await session.saveChanges();
}

async function archive(questionId: string) : Promise<Question | null> {
  const session = ravenStore.openSession();
  var q = await session.load<Question>(questionId);
  if(q == null)
    return null;

  q.isArchived = true;
  await session.saveChanges();
  return q;
}

async function findDuplicatedQuestions(queryString: QueryString): Promise<Question[]> {

  // const session = ravenStore.openSession();
  // var q =  session.query<Question>({indexName: "Questions/Search"})
  //   .moreLikeThis(b => b.usingDocument(JSON.stringify({"question": "What is the difference between == and === operators in JavaScript?"})))
  //   .all();
  
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
