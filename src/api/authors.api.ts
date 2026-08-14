import { apiClient } from "./axios";
import type { PaginatedResult, PageQueryParams } from "../types/pagination.types";
import type { author } from "../types/course.types";

interface AuthorListParams extends PageQueryParams {
  search?: string;
}


export async function getAuthors(params: AuthorListParams = {}) {
  const { data } = await apiClient.get<PaginatedResult<author>>("/authors/list", {
    params,
  });
  return data;
}