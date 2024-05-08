import axios from "axios";

export const login = async (data) =>
  await axios.post(import.meta.env.VITE_API_MYSQL + "/login", data);

export const register = async (data) =>
  await axios.post(import.meta.env.VITE_API_MYSQL + "/register", data);
