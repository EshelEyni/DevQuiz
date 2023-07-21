import { Request, Response } from "express";
import userService from "./user.service";
import { asyncErrorCatcher } from "../../services/error.service";
import factory from "../../services/factory.service";
import { UserModel, UserRightAnswerModel } from "./user.model";
import { User } from "../../../../shared/types/user";
import { QueryString } from "../../services/util.service";

const getUsers = asyncErrorCatcher(async (req: Request, res: Response) => {
  const queryString = req.query;
  const users = (await userService.query(queryString as QueryString)) as unknown as User[];

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: users.length,
    data: users,
  });
});

const getUserById = factory.getOne(UserModel);
const addUser = factory.createOne(UserModel);
const updateUser = factory.updateOne(UserModel, [
  "username",
  "email",
  "fullname",
  "imgUrl",
  "email",
  "isApprovedLocation",
]);
const removeUser = factory.deleteOne(UserModel);

const addUserCorrectAnswer = asyncErrorCatcher(async (req: Request, res: Response) => {
  const { id, language, level } = req.body;
  const { loggedinUserId } = req;
  await UserRightAnswerModel.create({ userId: loggedinUserId, questionId: id, language, level });

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
  });
});

export { getUsers, getUserById, addUser, updateUser, removeUser, addUserCorrectAnswer };
