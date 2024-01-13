import {
  QueryString,
  queryRavenDB,
  setIdToCollectionName,
  trimCollectionNameFromId,
} from "../../services/util.service";
import { ravenStore } from "../../server";
import { BasicUser, User as TypeOfUser, UserCorrectAnswer } from "../../../../shared/types/user";
import { RavenDbDocument } from "../../../../shared/types/system";
import bcrypt from "bcryptjs";
import { IDocumentSession } from "ravendb";
import { AppError } from "../../services/error.service";

const COLLECTION_NAME = "Users";

async function query(queryString: QueryString) {
  const users = (await queryRavenDB(queryString, "Users")) as unknown as TypeOfUser[];
  for (const user of users) {
    user.id = trimCollectionNameFromId(user.id);
  }
  return users;
}

async function getById(userId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, userId);
  const user = await session.load<TypeOfUser>(id);
  if (!user) throw new Error("User not found");
  user.id = trimCollectionNameFromId(user.id);
  return user;
}

async function add(userToAdd: BasicUser): Promise<TypeOfUser> {
  const session = ravenStore.openSession();
  await _validateUser(session, userToAdd as TypeOfUser);
  const doc = (await getDefaultUser(userToAdd)) as unknown as TypeOfUser & RavenDbDocument;
  doc["@metadata"] = { "@collection": COLLECTION_NAME };
  await session.store(doc, COLLECTION_NAME + "/");
  await session.saveChanges();
  doc.id = trimCollectionNameFromId(doc.id);
  return doc;
}

async function update(user: TypeOfUser) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, user.id);
  const doc = await session.load<TypeOfUser>(id);
  if (!doc) throw new AppError("User not found", 404);
  Object.assign(doc, user);
  await _validateUser(session, doc);
  await session.saveChanges();
  const updatedUser = {
    ...doc,
    id: trimCollectionNameFromId(doc.id),
  };
  return updatedUser;
}

async function remove(userId: string) {
  const id = setIdToCollectionName(COLLECTION_NAME, userId);
  const session = ravenStore.openSession();
  await session.delete(id);
  await session.saveChanges();
}

async function addUserCorrectAnswer(
  userId: string,
  questionId: string,
  language: string,
  level: string
) {
  const session = ravenStore.openSession();
  const isAnswerAlreadyAdded = await session
    .query({ collection: "UserCorrectAnswers" })
    .whereEquals("userId", userId)
    .whereEquals("questionId", questionId)
    .firstOrNull();

  if (isAnswerAlreadyAdded) return false;
  const doc = { userId, questionId, language, level } as UserCorrectAnswer & RavenDbDocument;
  doc["@metadata"] = { "@collection": "UserCorrectAnswers" };
  await session.store(doc);
  await session.saveChanges();
  return true;
}

async function getDefaultUser(user: BasicUser): Promise<TypeOfUser> {
  return {
    id: "",
    ...user,
    password: await _getHashedPassword(user.password),
    passwordConfirm: await _getHashedPassword(user.passwordConfirm),
    roles: ["user"],
    createdAt: Date.now(),
    quizSettings: {
      language: "HTML",
      level: "beginner",
      numQuestions: 25,
      secondsPerQuestion: 30,
    },
  };
}

async function _getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function _validateUser(session: IDocumentSession, user: TypeOfUser) {
  const { email, username } = user;
  const id = setIdToCollectionName(COLLECTION_NAME, user.id);

  const emailQuery = session.query({ collection: COLLECTION_NAME }).whereEquals("email", email);
  if (user.id) emailQuery.whereNotEquals("id", id);
  const userWithSameEmail = await emailQuery.firstOrNull();
  if (userWithSameEmail) throw new AppError("User with same email already exists", 400);

  const usernameQuery = session
    .query({ collection: COLLECTION_NAME })
    .whereEquals("username", username);
  if (user.id) usernameQuery.whereNotEquals("id", id);
  const userWithSameUsername = await usernameQuery.firstOrNull();
  if (userWithSameUsername) throw new AppError("User with same username already exists", 400);
}

export default {
  query,
  getById,
  add,
  update,
  remove,
  addUserCorrectAnswer,
};
