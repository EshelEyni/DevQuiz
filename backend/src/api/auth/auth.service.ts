import { User } from "../../../../shared/types/user";
import { AppError } from "../../services/error.service";
import bcrypt from "bcryptjs";
import tokenService from "../../services/token.service";
import { ravenStore } from "../../server";
import userService from "../user/user.service";
import { trimCollectionNameFromId } from "../../services/util.service";

async function login(username: string, password: string): Promise<{ user: User; token: string }> {
  const session = ravenStore.openSession();
  const user = await session
    .query<User>({ collection: "Users" })
    .whereEquals("username", username)
    .firstOrNull();

  if (!user) throw new AppError("User not found", 404);
  user.id = trimCollectionNameFromId(user.id);
  const isCorrectPassword = await _checkPassword(password, user.password!);
  if (!isCorrectPassword) throw new AppError("Incorrect username or password", 400);
  const token = tokenService.signToken(user.id);
  return {
    user: user as unknown as User,
    token,
  };
}

async function autoLogin(loginToken: string): Promise<{ user: User; newToken: string }> {
  const verifiedToken = await tokenService.verifyToken(loginToken);
  if (!verifiedToken) throw new AppError("Invalid token", 400);
  const { id } = verifiedToken;
  const user = await userService.getById(id);

  if (!user) throw new AppError("User not found", 404);
  const newToken = tokenService.signToken(user.id);
  return {
    user: user as unknown as User,
    newToken,
  };
}

async function signup(user: User): Promise<{ savedUser: User; token: string }> {
  const savedUser = await userService.add(user);
  const token = tokenService.signToken(savedUser.id);
  return {
    savedUser: savedUser as unknown as User,
    token,
  };
}

async function _checkPassword(candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

export default {
  login,
  autoLogin,
  signup,
};
