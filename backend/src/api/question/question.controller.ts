import { AppError, asyncErrorCatcher } from "../../services/error.service";
import factory from "../../services/factory.service";
import { QuestionModel } from "./question.model";
import { QueryString } from "../../services/util.service";
import questionService from "./question.service";

const getQuestions = asyncErrorCatcher(async (req, res, next) => {
  const queryString = req.query as QueryString;
  const question = await questionService.query(queryString);

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
  const questionId = req.params.id;
  if (!questionId) throw new AppError("No question ID provided", 400);
  const question = await questionService.archive(questionId);

  res.status(200).json({
    status: "success",
    data: {
      data: question,
    },
  });
});

const findDuplicatedQuestions = asyncErrorCatcher(async (req, res, next) => {
  const queryString = req.query as QueryString;
  const duplicatedQuestions = await questionService.findDuplicatedQuestions(queryString);

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
