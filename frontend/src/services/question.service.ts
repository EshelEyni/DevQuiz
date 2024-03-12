import { Question } from "../../../shared/types/question";
import { FetchAPIQuestionsParams } from "../../../shared/types/system";
import { questionReqProps } from "../store/types";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function query({
  language,
  level,
  page,
  limit = 25,
  searchTerm,
  isMarkedToBeRevised,
  isRevised,
}: questionReqProps): Promise<Question[]> {
  const levelQuery = `${level ? `&level=${level}` : ""}`;
  const limitQuery = `${limit ? `&limit=${limit}` : ""}`;
  const searchTermQuery = `${searchTerm ? `&searchTerm=${searchTerm}` : ""}`;
  const isMarkedToBeRevisedQuery = `${
    typeof isMarkedToBeRevised !== "undefined"
      ? `&isMarkedToBeRevised=${isMarkedToBeRevised}`
      : ""
  }`;
  const isRevisedQuery = `${
    typeof isRevised !== "undefined" ? `&isRevised=${isRevised}` : ""
  }`;

  const query = `question?language=${language}&page=${
    page || 0
  }${levelQuery}${limitQuery}${searchTermQuery}${isMarkedToBeRevisedQuery}${isRevisedQuery}`;
  try {
    const response = await httpService.get(query);
    return handleServerResponse<Question[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getDuplicatedQuestions({
  language,
}: {
  language: string;
}): Promise<Question[]> {
  try {
    const response = await httpService.get(
      `question/lang-duplicates?language=${language}`,
    );
    return handleServerResponse<Question[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getQuestionDuplications(
  questionId: string,
): Promise<Question[]> {
  try {
    const response = await httpService.get(`question/duplicates/${questionId}`);
    return handleServerResponse<Question[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getById(questionId: string): Promise<Question> {
  try {
    const question = await httpService.get(`question/${questionId}`);
    return handleServerResponse<Question>(question);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function add(question: Question): Promise<Question> {
  try {
    const addedQuestion = await httpService.post(`question`, question);
    return handleServerResponse<Question>(addedQuestion);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchQuestionsFromOpenAI({
  prompt,
  language,
  level,
  numberOfQuestions,
}: FetchAPIQuestionsParams): Promise<Question[]> {
  try {
    const body = {
      prompt,
      language,
      level,
      numberOfQuestions,
    };
    const response = await httpService.post(`question/fetch`, body);
    return handleServerResponse<Question[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(question: Question): Promise<Question> {
  try {
    const updatedQuestion = await httpService.put(`question`, question);
    return handleServerResponse<Question>(updatedQuestion);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function archive(question: Question): Promise<Question> {
  try {
    const archivedQuestion = await httpService.put(
      "question/archive",
      question,
    );
    return handleServerResponse<Question>(archivedQuestion);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  query,
  getDuplicatedQuestions,
  getQuestionDuplications,
  getById,
  add,
  fetchQuestionsFromOpenAI,
  update,
  archive,
};
