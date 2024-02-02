import { AppError, asyncErrorCatcher } from "../../services/error.service";
import { QueryString } from "../../services/util.service";
import questionService from "./question.service";

const getQuestions = asyncErrorCatcher(async (req, res, next) => {
  const queryString = req.query as QueryString;
  const questions = await questionService.query(queryString);
  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: questions.length,
    data: questions,
  });
});

const getQuestionById = asyncErrorCatcher(async (req, res, next) => {
  const questionId = req.params.id;
  if (!req.params.id) throw new AppError("No question ID provided", 400);
  const question = await questionService.getById(questionId);

  res.status(200).json({
    status: "success",
    data: question,
  });
});

const addQuestion = asyncErrorCatcher(async (req, res, next) => {
  const questionToAdd = req.body;
  const question = await questionService.add(questionToAdd);

  res.status(201).json({
    status: "success",
    data: question,
  });
});

const updateQuestion = asyncErrorCatcher(async (req, res, next) => {
  const questionToUpdate = req.body;
  const question = await questionService.update(questionToUpdate);
  res.status(200).json({
    status: "success",
    data: question,
  });
});

const removeQuestion = asyncErrorCatcher(async (req, res, next) => {
  const questionId = req.params.id;
  if (!questionId) throw new AppError("No question ID provided", 400);
  await questionService.remove(questionId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const archiveQuestion = asyncErrorCatcher(async (req, res, next) => {
  const questionToArchive = req.body;
  const question = await questionService.archive(questionToArchive);

  res.status(200).json({
    status: "success",
    data: question,
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

const findQuestionDuplications = asyncErrorCatcher(async (req, res, next) => {
  const questionId = req.params.id;
  if (!questionId) throw new AppError("No question ID provided", 400);
  const duplicatedQuestions = await questionService.findQuestionDuplications(questionId);

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
  findQuestionDuplications,
};
