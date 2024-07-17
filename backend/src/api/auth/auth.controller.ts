import { Request, Response } from "express";
import { BasicUser, User } from "../../../../shared/types/user";
import authService from "./auth.service";
import { AppError, asyncErrorCatcher } from "../../services/error.service";
import userService from "../user/user.service";
import { sendEmail } from "../../services/email.service";

const login = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) throw new AppError("Username and password are required", 400);
  const { user, token } = await authService.login(username, password);
  _sendUserTokenSuccessResponse(res, token, user, 200);
});

const autoLogin = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { dev_quiz_jwt } = req.cookies;
  if (!dev_quiz_jwt) throw new AppError("User not logged in", 401);
  const { user, newToken } = await authService.autoLogin(dev_quiz_jwt);
  _sendUserTokenSuccessResponse(res, newToken, user, 200);
});

const signup = asyncErrorCatcher(async (req: Request, res: Response) => {
  const user = req.body as unknown as BasicUser;
  const { savedUser, token } = await authService.signup(user);
  sendEmail({
    email: savedUser.email,
    subject: "Welcome to DevQuiz",
    message: `Welcome to DevQuiz, ${savedUser.username}!`,
  });
  _sendUserTokenSuccessResponse(res, token, savedUser, 201);
});

const logout = asyncErrorCatcher(async (req: Request, res: Response) => {
  res.clearCookie("dev_quiz_jwt");
  res.send({
    status: "success",
    data: {
      msg: "Logged out successfully",
    },
  });
});

const sendResetPassword = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) throw new AppError("user name is required", 400);
  const user = await userService.getByUserName(username);
  if (!user) throw new AppError("User not found", 404);
  const updatedUser = await authService.updateUserWithResetToken(user.id);
  const isProdEnv = process.env.NODE_ENV === "production";
  const baseUrl = isProdEnv ? `${req.protocol}://${req.get("host")}` : "http://localhost:5173";
  sendEmail({
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

const changePassword = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { password, passwordConfirm, resetToken } = req.body;
  if (!resetToken || !password) throw new AppError("Token and password are required", 400);
  if (password !== passwordConfirm) throw new AppError("Passwords do not match", 400);
  const isSuccess = await authService.changePassword(resetToken, password, passwordConfirm);
  if (!isSuccess) throw new AppError("Password reset failed", 400);
  res.status(200).json({
    status: "success",
    data: {
      msg: "Password reset successfully",
    },
  });
});

const _sendUserTokenSuccessResponse = (
  res: Response,
  token: string,
  user: User,
  status: number
) => {
  res.cookie("dev_quiz_jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(status).json({
    status: "success",
    token,
    data: user,
  });
};

const updateUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { loggedinUserId } = req;
  if (!loggedinUserId) throw new AppError("User not logged in", 401);
  const userToUpdate = req.body;
  if (userToUpdate.id !== loggedinUserId)
    throw new AppError("User can only update his own profile", 401);
  const user = await userService.update(userToUpdate);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export { login, autoLogin, signup, logout, updateUser, sendResetPassword, changePassword };
