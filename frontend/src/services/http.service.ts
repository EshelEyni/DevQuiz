import Axios, { Method } from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "https://82d5-2a06-c701-482b-fd00-1532-9c15-6a72-f650.ngrok-free.app/api/";
// : "http://localhost:3030/api/";

const axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint: string, data?: object) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data?: object) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data?: object) {
    return ajax(endpoint, "PUT", data);
  },
  patch(endpoint: string, data?: object) {
    return ajax(endpoint, "PATCH", data);
  },
  delete(endpoint: string, data?: object) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(
  endpoint: string,
  method: Method = "GET",
  data: object | null = null,
) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (data) delete (data as any)["password"];
    throw err;
  }
}
