/* eslint-disable no-console */
import { Question } from "../../../shared/types/question";
import { UserStats } from "../../../shared/types/system";
import { User } from "../../../shared/types/user";
import { LanguageAndLevel } from "../types/app.types";
import { httpService } from "./http.service";
import { storageService } from "./storage.service";
import { handleServerResponse } from "./utils.service";

const BASE_URL = "user";

function getLoggedinUser(): User | null {
  return storageService.get("loggedinUser");
}

async function query(): Promise<User[]> {
  try {
    const respose = await httpService.get(`${BASE_URL}`);
    return handleServerResponse<User[]>(respose);
  } catch (err) {
    console.log("User service: err in query", err);
    throw err;
  }
}

async function getById(userId: string): Promise<User> {
  try {
    const respose = await httpService.get(`${BASE_URL}/${userId}`);
    return handleServerResponse<User>(respose);
  } catch (err) {
    console.log("User service: err in getById", err);
    throw err;
  }
}

async function getByUsername(username: string): Promise<User> {
  try {
    const respose = await httpService.get(`${BASE_URL}/username/${username}`);
    return handleServerResponse<User>(respose);
  } catch (err) {
    console.log("User service: err in getByUsername", err);
    throw err;
  }
}

async function remove(userId: string): Promise<void> {
  try {
    await httpService.delete(`${BASE_URL}/${userId}`);
  } catch (err) {
    console.log("User service: err in remove", err);
    throw err;
  }
}

async function update(user: User): Promise<User> {
  try {
    const respose = await httpService.put(`${BASE_URL}`, user);
    return handleServerResponse<User>(respose);
  } catch (err) {
    console.log("User service: err in update", err);
    throw err;
  }
}

async function recordUserCorrectAnswer(question: Question): Promise<void> {
  try {
    await httpService.post(`${BASE_URL}/correct-answer`, question);
  } catch (err) {
    console.log("User service: err in saveUserRightAnswer", err);
    throw err;
  }
}

async function removeUserCorrectAnswers({
  level,
  language,
}: LanguageAndLevel): Promise<void> {
  try {
    let query = `${BASE_URL}/correct-answer?language=${language}`;
    if (level) query += `&level=${level}`;
    await httpService.delete(query);
  } catch (err) {
    console.log("User service: err in removeUserCorrectAnswer", err);
    throw err;
  }
}

async function getUserStats(): Promise<UserStats> {
  try {
    const respose = await httpService.get(`${BASE_URL}/user-stats`);
    return handleServerResponse<UserStats>(respose);
  } catch (err) {
    console.log("User service: err in getUserStats", err);
    throw err;
  }
}

export default {
  query,
  getById,
  getByUsername,
  getLoggedinUser,
  update,
  remove,
  recordUserCorrectAnswer,
  removeUserCorrectAnswers,
  getUserStats,
};
