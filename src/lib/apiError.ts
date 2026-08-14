import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "Bu bo'limni ko'rish uchun tizimga kirish talab qilinadi (401 Unauthorized).";
    }
    if (!error.response) {
      return "Backendga ulanib bo'lmadi. Server manzili (VITE_API_BASE_URL) va backend ishga tushganini tekshiring.";
    }
  }
  return fallback;
}