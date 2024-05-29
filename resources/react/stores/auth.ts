import { apiClient } from "@/utils/api-client";
import { AxiosResponse } from "axios";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: null | Record<string, any>;
  sessionRequest: () => Promise<AxiosResponse>;
  loginRequest: (payload: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  registerRequest: (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<AxiosResponse>;
  logoutRequest: () => Promise<AxiosResponse>;
  initToken: () => void;
  setToken: (token: string) => void;
  deleteToken: () => void;
  setUser: (user: any) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  sessionRequest: () => {
    const instance = apiClient();

    instance.interceptors.response.use((response) => {
      const data = response.data.data;

      get().setUser({
        name: data.name,
        email: data.email,
      });

      return response;
    });

    return instance.request({
      method: "get",
      url: "/v1/session",
    });
  },

  loginRequest: (payload) => {
    const instance = apiClient();

    instance.interceptors.response.use((response) => {
      const data = response.data.data;

      get().setToken(data.token);
      get().setUser({
        name: data.name,
        email: data.email,
      });

      return response;
    });

    return instance.request({
      method: "POST",
      url: "/v1/login",
      data: payload,
    });
  },

  registerRequest: (payload) => {
    const instance = apiClient();

    return instance.request({
      method: "POST",
      url: "/v1/register",
      data: payload,
    });
  },

  logoutRequest: () => {
    const instance = apiClient();

    instance.interceptors.response.use(
      (response) => {
        get().deleteToken();
        get().setUser(null);

        return response;
      },
      () => {
        get().deleteToken();
        get().setUser(null);
      }
    );

    return instance.request({
      method: "POST",
      url: "/v1/logout",
    });
  },

  initToken: () => {
    const token = localStorage.getItem("token");

    set((state) => ({
      ...state,
      token,
    }));
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);

    set((state) => ({
      ...state,
      token,
    }));
  },

  deleteToken: () => {
    localStorage.removeItem("token");

    set((state) => ({
      ...state,
      token: null,
    }));
  },

  setUser: (user: any) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
}));
