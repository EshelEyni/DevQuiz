import {
  BasicContactMessage,
  BasicReportQuestionMessage,
  ContactMessage,
  ContactMsgType,
  ReportQuestionMessage,
} from "../../../shared/types/system";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";


async function query(): Promise<Array<ContactMessage | ReportQuestionMessage>> {
  try {
    const respose = await httpService.get(`contact`);
    return handleServerResponse<Array<ContactMessage | ReportQuestionMessage>>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function getById(
  contactMsgId: string,
  type: ContactMsgType
): Promise<ContactMessage | ReportQuestionMessage> {
  try {
    const respose = await httpService.get(`contact/${contactMsgId}/${type}`);
    return handleServerResponse<ContactMessage | ReportQuestionMessage>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function remove(contactMsgId: string, type: ContactMsgType): Promise<void> {
  try {
    const respose = await httpService.delete(`contact/${contactMsgId}/${type}`);
    return handleServerResponse<void>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function update(
  contactMsg: ContactMessage | ReportQuestionMessage,
  type: ContactMsgType
): Promise<ContactMessage | ReportQuestionMessage> {
  try {
    const respose = await httpService.put(`contact/${contactMsg.id}/${type}`, contactMsg);
    return handleServerResponse<ContactMessage | ReportQuestionMessage>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function add(
  contactMsg: ContactMessage | ReportQuestionMessage,
  type: ContactMsgType
): Promise<ContactMessage | ReportQuestionMessage> {
  try {
    const respose = await httpService.post(`contact/${type}`, contactMsg);
    return handleServerResponse<ContactMessage | ReportQuestionMessage>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function sendContactMessage(msg: BasicContactMessage): Promise<any> {
  try {
    const respose = await httpService.post(`contact`, msg);
    return handleServerResponse<any>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function senReportOnQuestion(msg: BasicReportQuestionMessage): Promise<any> {
  try {
    const respose = await httpService.post(`contact/report-question`, msg);
    return handleServerResponse<any>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

export default {
  query,
  getById,
  remove,
  update,
  add,
  sendContactMessage,
  senReportOnQuestion,
};
