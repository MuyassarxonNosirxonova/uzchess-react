import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
    return Promise.reject(error);
  },
);