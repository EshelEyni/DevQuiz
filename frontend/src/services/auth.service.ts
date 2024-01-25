import { User } from "../../../shared/types/user";
import { UserCredentials } from "../types/auth.types";
import { JsendResponse } from "../types/system.interface";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

const BASE_URL = "auth";

async function loginWithToken(): Promise<User | null> {
  try {
    const response = (await httpService.post(
      "auth/auto-login",
    )) as unknown as JsendResponse;
    const user = response.data;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function login(username: string, password: string): Promise<User> {
  try {
    const response = (await httpService.post("auth/login", {
      username,
      password,
    })) as unknown as JsendResponse;
    const user = response.data;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signup(userCredentials: UserCredentials): Promise<User> {
  try {
    const response = (await httpService.post(
      "auth/signup",
      userCredentials,
    )) as unknown as JsendResponse;
    const savedUser = response.data;
    return savedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logout(): Promise<void> {
  try {
    const response = await httpService.post("auth/logout");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(user: User): Promise<User> {
  try {
    const respose = await httpService.put(`${BASE_URL}/update`, user);
    return handleServerResponse<User>(respose);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default { login, signup, logout, loginWithToken, update };
