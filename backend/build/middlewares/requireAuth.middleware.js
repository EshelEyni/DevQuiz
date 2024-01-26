"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const error_service_1 = require("../services/error.service");
const token_service_1 = __importDefault(require("../services/token.service"));
const user_service_1 = __importDefault(require("../api/user/user.service"));
const requireAuth = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const token = token_service_1.default.getTokenFromRequest(req);
    if (!token)
        return next(new error_service_1.AppError("You are not logged in! Please log in to get access.", 401));
    const verifiedToken = await token_service_1.default.verifyToken(token);
    if (!verifiedToken)
        return next(new error_service_1.AppError("Invalid Token.", 401));
    const { id } = verifiedToken;
    const currentUser = await user_service_1.default.getById(id);
    if (!currentUser)
        return next(new error_service_1.AppError("The user belonging to this token does not exist.", 401));
    req.loggedinUserId = id;
    next();
});
exports.requireAuth = requireAuth;
const requireAdmin = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const { loggedinUserId } = req;
    if (!loggedinUserId)
        throw new error_service_1.AppError("User not logged in", 401);
    const user = await user_service_1.default.getById(loggedinUserId);
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    if (!user.roles.includes("admin"))
        throw new error_service_1.AppError("User not authorized", 403);
    next();
});
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZUF1dGgubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9yZXF1aXJlQXV0aC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDZEQUF3RTtBQUN4RSw4RUFBcUQ7QUFDckQsNEVBQW1EO0FBRW5ELE1BQU0sV0FBVyxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzlGLE1BQU0sS0FBSyxHQUFHLHVCQUFZLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLHdCQUFRLENBQUMscURBQXFELEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRyxNQUFNLGFBQWEsR0FBRyxNQUFNLHVCQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELElBQUksQ0FBQyxhQUFhO1FBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSx3QkFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLGFBQWEsQ0FBQztJQUM3QixNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSx3QkFBUSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckYsR0FBRyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDeEIsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQztBQVdNLGtDQUFXO0FBVHBCLE1BQU0sWUFBWSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQy9GLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDL0IsSUFBSSxDQUFDLGNBQWM7UUFBRSxNQUFNLElBQUksd0JBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRSxNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFbUIsb0NBQVkifQ==