import { Request, Response } from "express";
import { BasicUser, User } from "../../../../shared/types/user";
import authService from "./auth.service";
import { AppError, asyncErrorCatcher } from "../../services/error.service";
import userService from "../user/user.service";

const login = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError("Username and password are required", 400);
  }

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

const _sendUserTokenSuccessResponse = (
  res: Response,
  token: string,
  user: User,
  status: number
) => {
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

export { login, autoLogin, signup, logout, updateUser };
