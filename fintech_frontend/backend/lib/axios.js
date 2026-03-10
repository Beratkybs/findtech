import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/rest/api",
  withCredentials: true,
});
