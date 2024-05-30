import { apiClient } from "@/utils/api-client";
import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { create } from "zustand";

export interface Diary {
  id: number;
  title: string;
  detail: string;
  pictureUrl: string;
  createdAt: string;
  updatedAt: string;
  truncatedDetail?: string;
  createdAtFormatted?: string;
  updatedAtFormatted?: string;
  isEdited?: boolean;
}

export const diaryTransformer = (item: any): Diary => {
  return {
    id: item.id,
    title: item.title,
    detail: item.detail,
    pictureUrl: item.picture_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    truncatedDetail:
      item.detail.split(" ").length > 15
        ? item.detail.split(" ").slice(0, 15).join(" ") + " ..."
        : item.detail,
    createdAtFormatted: DateTime.fromISO(item.created_at).toFormat(
      "dd LLL yyyy - HH:mm"
    ),
    updatedAtFormatted: DateTime.fromISO(item.updated_at).toFormat(
      "dd LLL yyyy - HH:mm"
    ),
    isEdited: item.created_at !== item.updated_at,
  };
};

interface DiaryState {
  fetchRequest: (params?: {
    page: number;
    per_page: number;
  }) => Promise<AxiosResponse>;
  showRequest: (id: number) => Promise<AxiosResponse>;
  addRequest: (inputs: any) => Promise<AxiosResponse>;
  deleteRequest: (id: number) => Promise<AxiosResponse>;
}

export const useDiary = create<DiaryState>(() => ({
  fetchRequest: (params) => {
    const instance = apiClient();

    return instance.request({
      method: "GET",
      url: "/v1/diaries",
      params: params,
    });
  },

  showRequest: (id) => {
    const instance = apiClient();

    return instance.request({
      method: "GET",
      url: `/v1/diary/${id}`,
    });
  },

  addRequest: (inputs: any) => {
    const instance = apiClient();

    const formData = new FormData();

    formData.append("title", inputs.title);
    formData.append("picture", inputs.picture);
    formData.append("detail", inputs.detail);

    return instance.request({
      method: "POST",
      url: "/v1/diary",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteRequest: (id) => {
    const instance = apiClient();

    return instance.request({
      method: "DELETE",
      url: `/v1/diary/${id}`,
    });
  },
}));
