import { useAuth } from "@/stores/auth";
import axios, { AxiosInstance } from "axios";

export const apiClient: () => AxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Accept: "application/json",
      Authorization: useAuth.getState().token
        ? `Bearer ${useAuth.getState().token}`
        : undefined,
    },
  });

  instance.interceptors.response.use((response) => {
    if (response.status === 401) {
      useAuth.getState().deleteToken();
    }

    return response;
  });

  return instance;
};
