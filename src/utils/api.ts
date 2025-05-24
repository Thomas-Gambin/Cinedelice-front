import axios from "axios";
import jscookie from "js-cookie";

const urlApi = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${urlApi}`,
});

api.interceptors.request.use((config) => {
  const token = jscookie.get("token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default api;
