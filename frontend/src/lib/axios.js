import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-7kgl.onrender.com/api",
  withCredentials: true,
});
