import { apiClient } from "./axios";
import type { Language } from "../types/course.types";

export async function getLanguages() {
  const { data } = await apiClient.get<Language[]>("/language/list");
  return data;
}