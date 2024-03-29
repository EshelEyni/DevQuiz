import { Request, Response } from "express";
import { AppError, asyncErrorCatcher } from "../../services/error.service";
import userServices from "./user.service";
import { QueryString } from "../../services/util.service";

const getUsers = asyncErrorCatcher(async (req: Request, res: Response) => {
  const queryString = req.query as QueryString;
  const users = await userServices.query(queryString);
  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: users.length,
    data: users,
  });
});

const getUserById = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userServices.getById(userId);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

const addUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userToAdd = req.body;
  const user = await userServices.add(userToAdd);
  res.status(201).json({
    status: "success",
    data: user,
  });
});

const updateUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userToUpdate = req.body;
  const user = await userServices.update(userToUpdate);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

const removeUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userServices.remove(userId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const addUserCorrectAnswer = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { id, language, level } = req.body;
  const { loggedinUserId } = req;
  if (!loggedinUserId) throw new AppError("User not logged in", 401);
  await userServices.addUserCorrectAnswer(loggedinUserId, id, language, level);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
  });
});

const removeUserCorrectAnswers = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { loggedinUserId } = req;
  if (!loggedinUserId) throw new AppError("User not logged in", 401);
  const { language, level } = req.query as QueryString;
  await userServices.removeUserCorrectAnswers({
    loggedinUserId,
    language,
    level,
  });

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
  });
});

const getUserStats = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { loggedinUserId } = req;
  if (!loggedinUserId) throw new AppError("User not logged in", 401);
  const userStats = await userServices.getUserStats(loggedinUserId);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    data: userStats,
  });
});

export {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
  addUserCorrectAnswer,
  removeUserCorrectAnswers,
  getUserStats,
};
