import axios from "axios";
import { BACKEND_URL } from "../config";
import { useAuth } from "../store/useAuth";

const api = axios.create({
  baseURL: BACKEND_URL,
});

// Attach token from zustand store to every request
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers = {
      ...(config.headers || {}),
      authorization: token,
    };
  }
  return config;
});

export default api;
