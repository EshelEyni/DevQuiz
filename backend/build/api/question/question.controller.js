"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQuestionDuplications = exports.findDuplicatedQuestions = exports.removeQuestion = exports.archiveQuestion = exports.updateQuestion = exports.fetchQuestions = exports.addQuestion = exports.getQuestionById = exports.getQuestions = void 0;
const error_service_1 = require("../../services/error.service");
const openAI_service_1 = require("../../services/openAI.service");
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
const fetchQuestions = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const { prompt, numberOfQuestions, language, level } = req.body;
    const questions = await (0, openAI_service_1.fetchQuestionsFromOpenAI)({
        prompt,
        numberOfQuestions,
        language,
        level,
    });
    res.status(201).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: questions.length,
        data: questions,
    });
});
exports.fetchQuestions = fetchQuestions;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcXVlc3Rpb24vcXVlc3Rpb24uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBMkU7QUFDM0Usa0VBQXlFO0FBRXpFLDBFQUFpRDtBQUVqRCxNQUFNLFlBQVksR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzlELE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFvQixDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVM7UUFDakIsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ3JDLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsU0FBUztLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQStGRCxvQ0FBWTtBQTdGZCxNQUFNLGVBQWUsR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2pFLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RSxNQUFNLFFBQVEsR0FBRyxNQUFNLDBCQUFlLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFxRkQsMENBQWU7QUFuRmpCLE1BQU0sV0FBVyxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDN0QsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUMvQixNQUFNLFFBQVEsR0FBRyxNQUFNLDBCQUFlLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTFELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUE0RUQsa0NBQVc7QUExRWIsTUFBTSxjQUFjLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ2hFLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBQSx5Q0FBd0IsRUFBQztRQUMvQyxNQUFNO1FBQ04saUJBQWlCO1FBQ2pCLFFBQVE7UUFDUixLQUFLO0tBQ04sQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVM7UUFDakIsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ3JDLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN6QixJQUFJLEVBQUUsU0FBUztLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQTZERCx3Q0FBYztBQTNEaEIsTUFBTSxjQUFjLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBZSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFxREQsd0NBQWM7QUFuRGhCLE1BQU0sY0FBYyxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLFVBQVU7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwRSxNQUFNLDBCQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXpDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUE0Q0Qsd0NBQWM7QUExQ2hCLE1BQU0sZUFBZSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDakUsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sMEJBQWUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVsRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBaUNELDBDQUFlO0FBL0JqQixNQUFNLHVCQUF1QixHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDekUsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQW9CLENBQUM7SUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLDBCQUFlLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdkYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVM7UUFDakIsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ3JDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxNQUFNO1FBQ25DLElBQUksRUFBRSxtQkFBbUI7S0FDMUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUF1QkQsMERBQXVCO0FBckJ6QixNQUFNLHdCQUF3QixHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDMUUsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLFVBQVU7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwRSxNQUFNLG1CQUFtQixHQUFHLE1BQU0sMEJBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV2RixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDckMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLE1BQU07UUFDbkMsSUFBSSxFQUFFLG1CQUFtQjtLQUMxQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQVdELDREQUF3QiJ9