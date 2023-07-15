import { Question } from "../../../shared/types/question";
import { questionReqProps } from "../store/types";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function query({
  language,
  level,
  page,
  limit = 25,
  searchTerm,
}: questionReqProps): Promise<Question[]> {
  let query = `question?language=${language}&page=${page}&level=${level}`;
  const limitQuery = `${limit ? `&limit=${limit}` : ""}`;
  const searchTermQuery = `${searchTerm ? `&searchTerm=${searchTerm}` : ""}`;
  query += limitQuery + searchTermQuery;

  try {
    const respose = await httpService.get(query);
    return handleServerResponse<Question[]>(respose);
  } catch (err) {
    console.log("Question service: err in query", err);
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
    const updatedQuestion = await httpService.put(`question/${question.id}`, question);
    return handleServerResponse<Question>(updatedQuestion);
  } catch (err) {
    console.log("Question service: err in update", err);
    throw err;
  }
}

async function archive(questionId: string): Promise<Question> {
  try {
    const archivedQuestion = await httpService.put(`question/${questionId}/archive`);
    return handleServerResponse<Question>(archivedQuestion);
  } catch (err) {
    console.log("Question service: err in archive", err);
    throw err;
  }
}

export default {
  query,
  getById,
  add,
  update,
  archive,
};
