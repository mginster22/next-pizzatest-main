import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://next-pizzatest-main.vercel.app/api",
  withCredentials: true,
});
