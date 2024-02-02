"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQuestionDuplications = exports.findDuplicatedQuestions = exports.removeQuestion = exports.archiveQuestion = exports.updateQuestion = exports.addQuestion = exports.getQuestionById = exports.getQuestions = void 0;
const error_service_1 = require("../../services/error.service");
const question_service_1 = __importDefault(require("./question.service"));
const getQuestions = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const queryString = req.query;
    const questions = await question_service_1.default.query(queryString);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: questions.length,
        data: questions,
    });
});
exports.getQuestions = getQuestions;
const getQuestionById = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionId = req.params.id;
    if (!req.params.id)
        throw new error_service_1.AppError("No question ID provided", 400);
    const question = await question_service_1.default.getById(questionId);
    res.status(200).json({
        status: "success",
        data: question,
    });
});
exports.getQuestionById = getQuestionById;
const addQuestion = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionToAdd = req.body;
    const question = await question_service_1.default.add(questionToAdd);
    res.status(201).json({
        status: "success",
        data: question,
    });
});
exports.addQuestion = addQuestion;
const updateQuestion = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionToUpdate = req.body;
    const question = await question_service_1.default.update(questionToUpdate);
    res.status(200).json({
        status: "success",
        data: question,
    });
});
exports.updateQuestion = updateQuestion;
const removeQuestion = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionId = req.params.id;
    if (!questionId)
        throw new error_service_1.AppError("No question ID provided", 400);
    await question_service_1.default.remove(questionId);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
exports.removeQuestion = removeQuestion;
const archiveQuestion = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionToArchive = req.body;
    const question = await question_service_1.default.archive(questionToArchive);
    res.status(200).json({
        status: "success",
        data: question,
    });
});
exports.archiveQuestion = archiveQuestion;
const findDuplicatedQuestions = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const queryString = req.query;
    const duplicatedQuestions = await question_service_1.default.findDuplicatedQuestions(queryString);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: duplicatedQuestions.length,
        data: duplicatedQuestions,
    });
});
exports.findDuplicatedQuestions = findDuplicatedQuestions;
const findQuestionDuplications = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const questionId = req.params.id;
    if (!questionId)
        throw new error_service_1.AppError("No question ID provided", 400);
    const duplicatedQuestions = await question_service_1.default.findQuestionDuplications(questionId);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: duplicatedQuestions.length,
        data: duplicatedQuestions,
    });
});
exports.findQuestionDuplications = findQuestionDuplications;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBMkU7QUFFM0UsMEVBQWlEO0FBRWpELE1BQU0sWUFBWSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDOUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsTUFBTSwwQkFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDckMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3pCLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBK0VELG9DQUFZO0FBN0VkLE1BQU0sZUFBZSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakUsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sUUFBUSxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxH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