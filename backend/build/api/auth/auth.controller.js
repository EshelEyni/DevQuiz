"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.sendResetPassword = exports.updateUser = exports.logout = exports.signup = exports.autoLogin = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const error_service_1 = require("../../services/error.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const email_service_1 = require("../../services/email.service");
const login = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        throw new error_service_1.AppError("Username and password are required", 400);
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
    (0, email_service_1.sendEmail)({
        email: savedUser.email,
        subject: "Welcome to DevQuiz",
        message: `Welcome to DevQuiz, ${savedUser.username}!`,
    });
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
const sendResetPassword = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { username } = req.params;
    if (!username)
        throw new error_service_1.AppError("user name is required", 400);
    const user = await user_service_1.default.getByUserName(username);
    if (!user)
        throw new error_service_1.AppError("User not found", 404);
    const updatedUser = await auth_service_1.default.updateUserWithResetToken(user.id);
    const isProdEnv = process.env.NODE_ENV === "production";
    const baseUrl = isProdEnv ? `${req.protocol}://${req.get("host")}` : "http://localhost:5173";
    (0, email_service_1.sendEmail)({
        email: user.email,
        subject: "Password reset token (valid for 10 minutes)",
        message: `You recently requested to reset your password for your account in DevQuiz. Please click the link below to reset it: ${baseUrl}/home/auth/?resetToken=${updatedUser.passwordResetToken}`,
        html: ` 
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                    color: #333;
                  }
                  .container {
                    background-color: #ffffff;
                    padding: 20px;
                    max-width: 600px;
                    margin: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    border-bottom: 2px solid #eeeeee;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                  }
                  .footer {
                    border-top: 1px solid #eeeeee;
                    padding-top: 20px;
                    margin-top: 20px;
                    font-size: 14px;
                    color: #777;
                  }
                  a {
                    color: #007bff;
                    text-decoration: none;
                  }
                  .link-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                  }
                  .link {
                    display: inline-block;
                    background-color: #007bff;
                    color: #ffffff;
                    padding: 10px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                    margin: 0 auto;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>Password Reset Request</h2>
                  </div>
                  <p>Hello,</p>
                  <p>
                    You recently requested to reset your password for your account. Please click the button
                    below to reset it:
                  </p>
                  <p class="link-container">
                    <a href="${baseUrl}/home/auth/?resetToken=${updatedUser.passwordResetToken}" class="link"
                      >Reset Your Password</a
                    >
                  </p>
                  <p>
                    If you did not request a password reset, please ignore this email or contact our support
                    team.
                  </p>
                  <p>This link is only valid for the next 10 minutes.</p>
                  <div class="footer">
                    Regards,<br />
                    DevQuiz Team<br />
                    <a href="https://devquiz.esheleyni.com/home">DevQuiz</a>
                  </div>
                </div>
              </body>
            </html>
    `,
    });
    res.status(200).json({
        status: "success",
        data: {
            msg: "Password reset token sent to email",
        },
    });
});
exports.sendResetPassword = sendResetPassword;
const changePassword = (0, error_service_1.asyncErrorCatcher)(async (req, res) => {
    const { password, passwordConfirm, resetToken } = req.body;
    if (!resetToken || !password)
        throw new error_service_1.AppError("Token and password are required", 400);
    if (password !== passwordConfirm)
        throw new error_service_1.AppError("Passwords do not match", 400);
    const isSuccess = await auth_service_1.default.changePassword(resetToken, password, passwordConfirm);
    if (!isSuccess)
        throw new error_service_1.AppError("Password reset failed", 400);
    res.status(200).json({
        status: "success",
        data: {
            msg: "Password reset successfully",
        },
    });
});
exports.changePassword = changePassword;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9hdXRoL2F1dGguY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxrRUFBeUM7QUFDekMsZ0VBQTJFO0FBQzNFLHdFQUErQztBQUMvQyxnRUFBeUQ7QUFFekQsTUFBTSxLQUFLLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN4QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUTtRQUFFLE1BQU0sSUFBSSx3QkFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFGLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxzQkFBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEUsNkJBQTZCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFzTE0sc0JBQUs7QUFwTGQsTUFBTSxTQUFTLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3hFLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxZQUFZO1FBQUUsTUFBTSxJQUFJLHdCQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHNCQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JFLDZCQUE2QixDQUFD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