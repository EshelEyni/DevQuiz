import { ContactMessage, ReportQuestionMessage } from "../../../shared/types/system";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function sendContactMessage(msg: ContactMessage): Promise<any> {
  try {
    const respose = await httpService.post(`contact`, msg);
    return handleServerResponse<any>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

async function senReportOnQuestion(msg: ReportQuestionMessage): Promise<any> {
  try {
    const respose = await httpService.post(`contact/report-question`, msg);
    return handleServerResponse<any>(respose);
  } catch (err) {
    console.log("Contact service: err in query", err);
    throw err;
  }
}

export { sendContactMessage, senReportOnQuestion };
