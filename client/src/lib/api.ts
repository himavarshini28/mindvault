import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { BACKEND_URL } from "../config";
import { useAuth } from "../store/useAuth";

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    const safeHeaders: Record<string, string> = {
      ...(config.headers as Record<string, string> | undefined),
      authorization: token,
    };
    config.headers = safeHeaders as unknown as AxiosRequestHeaders;
  }
  return config;
});

export default api;
