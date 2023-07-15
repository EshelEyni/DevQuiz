import { Question } from "../../../shared/types/question";
import { questionReqProps } from "../store/types";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function query({
  language,
  level,
  page,
  limit = 25,
  searchField,
  searchTerm,
}: questionReqProps): Promise<Question[]> {
  const levelQuery = `${level ? `&level=${level}` : ""}`;
  const limitQuery = `${limit ? `&limit=${limit}` : ""}`;
  const searchFieldQuery = `${searchField ? `&searchField=${searchField}` : ""}`;
  const searchTermQuery = `${searchTerm ? `&searchTerm=${searchTerm}` : ""}`;
  const query = `question?language=${language}&page=${page}${levelQuery}${limitQuery}${searchFieldQuery}${searchTermQuery}`;
  try {
    const response = await httpService.get(query);
    console.log("Question service: respose", response.data);
    return handleServerResponse<Question[]>(response);
  } catch (err) {
    console.log("Question service: err in query", err);
    throw err;
  }
}

async function getDuplicatedQuestions({ language }: { language: string }): Promise<Question[]> {
  try {
    const response = await httpService.get(`question/duplicates?language=${language}`);
    return handleServerResponse<Question[]>(response);
  } catch (err) {
    console.log("Question service: err in getDuplicatedQuestions", err);
    throw err;
  }
}

async function getById(questionId: string): Promise<Question> {
  try {
    const question = await httpService.get(`question/${questionId}`);
    return handleServerResponse<Question>(question);
  } catch (err) {
    console.log("Question service: err in getById", err);
    throw err;
  }
}

async function add(question: Question): Promise<Question> {
  try {
    const addedQuestion = await httpService.post(`question`, question);
    return handleServerResponse<Question>(addedQuestion);
  } catch (err) {
    console.log("Question service: err in add", err);
    throw err;
  }
}

async function update(question: Question): Promise<Question> {
  try {
    const updatedQuestion = await httpService.patch(`question/${question.id}`, question);
    return handleServerResponse<Question>(updatedQuestion);
  } catch (err) {
    console.log("Question service: err in update", err);
    throw err;
  }
}

async function archive(questionId: string): Promise<Question> {
  try {
    const archivedQuestion = await httpService.patch(`question/${questionId}/archive`);
    return handleServerResponse<Question>(archivedQuestion);
  } catch (err) {
    console.log("Question service: err in archive", err);
    throw err;
  }
}

export default {
  query,
  getDuplicatedQuestions,
  getById,
  add,
  update,
  archive,
};
