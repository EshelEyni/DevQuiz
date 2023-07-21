import { httpService } from "./http.service";
import { handleServerResponse } from "./utils.service";

async function getSystemSettings() {
  try {
    const respose = await httpService.get(`system`);
    return handleServerResponse(respose);
  } catch (err) {
    console.log("Question service: err in query", err);
    throw err;
  }
}

async function saveSiteEntry() {
  try {
    httpService.post(`system/entry`);
  } catch (err) {
    console.log("Question service: err in query", err);
    throw err;
  }
}

export default { getSystemSettings, saveSiteEntry };
