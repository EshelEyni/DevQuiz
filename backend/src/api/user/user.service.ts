import { QueryString, queryRavenDB, setIdToCollectionName } from "../../services/util.service";
import { ravenStore } from "../../server";
import { BasicUser, User as TypeOfUser, UserCorrectAnswer } from "../../../../shared/types/user";
import { RavenDbDocument } from "../../../../shared/types/system";
import bcrypt from "bcryptjs";

const collectionName = "Users";

async function query(queryString: QueryString) {
  const users = await queryRavenDB(queryString, "Users");
  return users;
}

async function getById(userId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(collectionName, userId);
  const user = await session.load<TypeOfUser>(id);
  return user;
}

async function add(userToAdd: BasicUser): Promise<TypeOfUser> {
  const session = ravenStore.openSession();
  const doc = (await getDefaultUser(userToAdd)) as unknown as TypeOfUser & RavenDbDocument;
  doc["@metadata"] = { "@collection": collectionName };
  await session.store(doc, collectionName + "/");
  await session.saveChanges();
  return doc;
}

async function update(userToUpdate: TypeOfUser) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(collectionName, userToUpdate.id);
  let updatedUser = await session.load<TypeOfUser>(id);
  if (!updatedUser) throw new Error("User not found");
  updatedUser = { ...userToUpdate };
  await session.saveChanges();
  return updatedUser;
}

async function remove(userId: string) {
  const session = ravenStore.openSession();
  await session.delete(userId);
  await session.saveChanges();
}

async function addUserCorrectAnswer(
  userId: string,
  questionId: string,
  language: string,
  level: string
) {
  const session = ravenStore.openSession();
  const doc = { userId, questionId, language, level } as UserCorrectAnswer & RavenDbDocument;
  doc["@metadata"] = { "@collection": "UserCorrectAnswers" };

  await session.store(doc);
  await session.saveChanges();
}

async function getDefaultUser(user: BasicUser): Promise<TypeOfUser> {
  return {
    id: "",
    ...user,
    password: await _getHashedPassword(user.password),
    passwordConfirm: await _getHashedPassword(user.passwordConfirm),
    roles: ["user"],
    createdAt: Date.now(),
  };
}

async function _getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export default {
  query,
  getById,
  add,
  update,
  remove,
  addUserCorrectAnswer,
};
