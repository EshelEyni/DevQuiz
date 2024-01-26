"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logout = exports.signup = exports.autoLogin = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const error_service_1 = require("../../services/error.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const login = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new error_service_1.AppError("Username and password are required", 400);
    }
    const { user, token } = await auth_service_1.default.login(username, password);
    _sendUserTokenSuccessResponse(res, token, user, 200);
});
exports.login = login;
const autoLogin = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { dev_quiz_jwt } = req.cookies;
    if (!dev_quiz_jwt)
        throw new error_service_1.AppError("User not logged in", 401);
    const { user, newToken } = await auth_service_1.default.autoLogin(dev_quiz_jwt);
    _sendUserTokenSuccessResponse(res, newToken, user, 200);
});
exports.autoLogin = autoLogin;
const signup = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const user = req.body;
    const { savedUser, token } = await auth_service_1.default.signup(user);
    _sendUserTokenSuccessResponse(res, token, savedUser, 201);
});
exports.signup = signup;
const logout = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    res.clearCookie("dev_quiz_jwt");
    res.send({
        status: "success",
        data: {
            msg: "Logged out successfully",
        },
    });
});
exports.logout = logout;
const _sendUserTokenSuccessResponse = (res, token, user, status) => {
    res.cookie("dev_quiz_jwt", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
    });
    res.status(status).json({
        status: "success",
        token,
        data: user,
    });
};
const updateUser = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { loggedinUserId } = req;
    if (!loggedinUserId)
        throw new error_service_1.AppError("User not logged in", 401);
    const userToUpdate = req.body;
    if (userToUpdate.id !== loggedinUserId)
        throw new error_service_1.AppError("User can only update his own profile", 401);
    const user = await user_service_1.default.update(userToUpdate);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.updateUser = updateUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9hdXRoL2F1dGguY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxrRUFBeUM7QUFDekMsZ0VBQTJFO0FBQzNFLHdFQUErQztBQUUvQyxNQUFNLEtBQUssR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXhDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDMUIsTUFBTSxJQUFJLHdCQUFRLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDL0Q7SUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXBFLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBNkRNLHNCQUFLO0FBM0RkLE1BQU0sU0FBUyxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN4RSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxJQUFJLENBQUMsWUFBWTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyRSw2QkFBNkIsQ0FBQyxH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