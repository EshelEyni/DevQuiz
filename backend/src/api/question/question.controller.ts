import { AppError, asyncErrorCatcher } from "../../services/error.service";
import factory from "../../services/factory.service";
import { QuestionModel } from "./question.model";
import { APIFeatures, QueryString } from "../../services/util.service";
import natural from "natural";

const getQuestions = factory.getAll(QuestionModel);
const getQuestionById = factory.getOne(QuestionModel);
const addQuestion = factory.createOne(QuestionModel);
const updateQuestion = factory.updateOne(QuestionModel, []);

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

const removeQuestion = factory.deleteOne(QuestionModel);

const findDuplicatedQuestions = asyncErrorCatcher(async (req, res, next) => {
  const features = new APIFeatures(QuestionModel.find(), req.query as QueryString)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  const docs = (await features.getQuery()) as any[];
  const questions = docs.map(doc => doc.toObject());

  const duplicates = [];

  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer;

  for (let i = 0; i < questions.length; i++) {
    const question1 = questions[i];

    for (let j = i + 1; j < questions.length; j++) {
      const question2 = questions[j];

      const tokens1 = tokenizer.tokenize(question1.question);
      const tokens2 = tokenizer.tokenize(question2.question);
      if (!tokens1 || !tokens2) continue;
      const stems1 = tokens1.map(token => stemmer.stem(token));
      const stems2 = tokens2.map(token => stemmer.stem(token));

      const intersection = new Set([...stems1].filter(stem => stems2.includes(stem)));
      const union = new Set([...stems1, ...stems2]);
      const similarity = intersection.size / union.size;

      if (similarity > 0.7) {
        duplicates.push({
          question1: question1,
          question2: question2,
          similarity: similarity.toFixed(2),
        });
      }
    }
  }

  const sortedDuplicatesBySimilarity = duplicates.sort(
    (a: any, b: any) => Number(b.similarity) - Number(a.similarity)
  );

  const duplicatedQuestion = sortedDuplicatesBySimilarity
    .map((duplicate: any) => {
      return [{ ...duplicate.question1 }, { ...duplicate.question2 }];
    })
    .flat(Infinity);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: duplicatedQuestion.length,
    data: duplicatedQuestion,
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
