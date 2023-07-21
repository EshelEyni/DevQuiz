import { AppError, asyncErrorCatcher } from "../../services/error.service";
import factory from "../../services/factory.service";
import { QuestionModel } from "./question.model";
import { APIFeatures, QueryString } from "../../services/util.service";
import natural from "natural";
import { Document } from "mongoose";
import { Question } from "../../../../shared/types/question";
import questionService from "./question.service";

const SIMILARITY_THRESHOLD = 0.5;

const getQuestions = asyncErrorCatcher(async (req, res, next) => {
  const question = await questionService.query(req.query as QueryString);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: question.length,
    data: question,
  });
});

const getQuestionById = factory.getOne(QuestionModel);
const addQuestion = factory.createOne(QuestionModel);
const updateQuestion = factory.updateOne(QuestionModel);
const removeQuestion = factory.deleteOne(QuestionModel);

const archiveQuestion = asyncErrorCatcher(async (req, res, next) => {
  const question = await QuestionModel.findById(req.params.id);
  if (!question) throw new AppError("No quesiton found with that ID", 404);
  question.isArchived = true;
  await question.save();
  res.status(200).json({
    status: "success",
    data: {
      data: question,
    },
  });
});

const findDuplicatedQuestions = asyncErrorCatcher(async (req, res, next) => {
  type Duplicate = {
    question1: Question;
    question2: Question;
    similarity: number;
  };

  const features = new APIFeatures(QuestionModel.find(), req.query as QueryString)
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

  const duplicatedQuestions = getDuplicatedQuestions(questions);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: duplicatedQuestions.length,
    data: duplicatedQuestions,
  });
});

export {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  archiveQuestion,
  removeQuestion,
  findDuplicatedQuestions,
};
