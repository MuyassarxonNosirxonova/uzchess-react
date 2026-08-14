import { apiClient } from "./axios";
import type { PaginatedResult, PageQueryParams } from "../types/pagination.types";
import type { Difficulty } from "../types/course.types";

export async function getDifficulties(params: PageQueryParams = {}) {
  const { data } = await apiClient.get<PaginatedResult<Difficulty>>(
    "/difficulties/list",
    { params },
  );
  return data;
}