import { Request, Response, NextFunction } from "express";
import { AppError, asyncErrorCatcher } from "../services/error.service";
import tokenService from "../services/token.service";
import userService from "../api/user/user.service";

const requireAuth = asyncErrorCatcher(async (req: Request, res: Response, next: NextFunction) => {
  const token = tokenService.getTokenFromRequest(req);
  if (!token) return next(new AppError("You are not logged in! Please log in to get access.", 401));
  const verifiedToken = await tokenService.verifyToken(token);
  if (!verifiedToken) return next(new AppError("Invalid Token.", 401));
  const { id } = verifiedToken;
  const currentUser = await userService.getById(id);
  if (!currentUser)
    return next(new AppError("The user belonging to this token does not exist.", 401));
  req.loggedinUserId = id;
  next();
});

const requireAdmin = asyncErrorCatcher(async (req: Request, res: Response, next: NextFunction) => {
  const { loggedinUserId } = req;
  if (!loggedinUserId) throw new AppError("User not logged in", 401);
  const user = await userService.getById(loggedinUserId);
  if (!user) throw new AppError("User not found", 404);
  if (!user.roles.includes("admin")) throw new AppError("User not authorized", 403);
  next();
});

export { requireAuth, requireAdmin };
