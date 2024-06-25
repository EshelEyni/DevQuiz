import { JobApplication } from "./../../../shared/types/application";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

const baseUrl = "application";

async function query() {
  try {
    const response = await httpService.get(`${baseUrl}`);
    return handleServerResponse<JobApplication[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getById(id: string) {
  try {
    const response = await httpService.get(`${baseUrl}/${id}`);
    return handleServerResponse<JobApplication>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function add(application: JobApplication) {
  try {
    const response = await httpService.post(`${baseUrl}`, application);
    return handleServerResponse<JobApplication>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function update(application: JobApplication) {
  try {
    const response = await httpService.put(`${baseUrl}`, application);
    return handleServerResponse<JobApplication>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function archive(application: JobApplication) {
  try {
    const response = await httpService.put(`${baseUrl}/archive`, application);
    return handleServerResponse<JobApplication>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getDefaultJobApplication(userId: string): JobApplication {
  return {
    id: "",
    userId,
    status: "new",
    url: "",
    notes: "",
    imgs: [],
    contacts: [],
    company: "company",
    position: "developer",
    todoList: [],
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    isArchived: false,
  };
}

export const applicationService = {
  query,
  getById,
  add,
  update,
  archive,
  getDefaultJobApplication,
};
