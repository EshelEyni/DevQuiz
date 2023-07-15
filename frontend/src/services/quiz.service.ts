import { Question } from "../../../shared/types/question";
import { questionReqProps } from "../store/types";
import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function query({
  language,
  level,
  offSet,
  limit = 25,
}: questionReqProps): Promise<Question[]> {
  try {
    const respose = await httpService.get(
      `question?language=${language}&page=${offSet}&level=${level}&limit=${limit}`
    );
    return handleServerResponse<Question[]>(respose);
  } catch (err) {
    console.log("Question service: err in query", err);
    throw err;
  }
}

export default { query };
