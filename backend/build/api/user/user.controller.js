"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.removeUserCorrectAnswers = exports.addUserCorrectAnswer = exports.removeUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
const error_service_1 = require("../../services/error.service");
const user_service_1 = __importDefault(require("./user.service"));
const getUsers = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const queryString = req.query;
    const users = await user_service_1.default.query(queryString);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: users.length,
        data: users,
    });
});
exports.getUsers = getUsers;
const getUserById = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const userId = req.params.id;
    const user = await user_service_1.default.getById(userId);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getUserById = getUserById;
const addUser = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const userToAdd = req.body;
    const user = await user_service_1.default.add(userToAdd);
    res.status(201).json({
        status: "success",
        data: user,
    });
});
exports.addUser = addUser;
const updateUser = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const userToUpdate = req.body;
    const user = await user_service_1.default.update(userToUpdate);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.updateUser = updateUser;
const removeUser = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const userId = req.params.id;
    await user_service_1.default.remove(userId);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
exports.removeUser = removeUser;
const addUserCorrectAnswer = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { id, language, level } = req.body;
    const { loggedinUserId } = req;
    if (!loggedinUserId)
        throw new error_service_1.AppError("User not logged in", 401);
    await user_service_1.default.addUserCorrectAnswer(loggedinUserId, id, language, level);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
    });
});
exports.addUserCorrectAnswer = addUserCorrectAnswer;
const removeUserCorrectAnswers = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { loggedinUserId } = req;
    if (!loggedinUserId)
        throw new error_service_1.AppError("User not logged in", 401);
    const { language, level } = req.query;
    await user_service_1.default.removeUserCorrectAnswers({
        loggedinUserId,
        language,
        level,
    });
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
    });
});
exports.removeUserCorrectAnswers = removeUserCorrectAnswers;
const getUserStats = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { loggedinUserId } = req;
    if (!loggedinUserId)
        throw new error_service_1.AppError("User not logged in", 401);
    const userStats = await user_service_1.default.getUserStats(loggedinUserId);
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        data: userStats,
    });
});
exports.getUserStats = getUserStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS91c2VyL3VzZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxnRUFBMkU7QUFDM0Usa0VBQTBDO0FBRzFDLE1BQU0sUUFBUSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN2RSxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBb0IsQ0FBQztJQUM3QyxNQUFNLEtBQUssR0FBRyxNQUFNLHNCQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtRQUNyQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU07UUFDckIsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQStFRCw0QkFBUTtBQTdFVixNQUFNLFdBQVcsR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBdUVELGtDQUFXO0FBckViLE1BQU0sT0FB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