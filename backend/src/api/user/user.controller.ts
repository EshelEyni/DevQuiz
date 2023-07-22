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
    data: {
      data: user,
    },
  });
});

const addUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userToAdd = req.body;
  const user = await userServices.add(userToAdd);
  res.status(201).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

const updateUser = asyncErrorCatcher(async (req: Request, res: Response) => {
  const userToUpdate = req.body;
  const user = await userServices.update(userToUpdate);
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
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
  const isSaved = await userServices.addUserCorrectAnswer(loggedinUserId, id, language, level);
  if (!isSaved) throw new AppError("Answer already added", 400);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
  });
});

export { getUsers, getUserById, addUser, updateUser, removeUser, addUserCorrectAnswer };
