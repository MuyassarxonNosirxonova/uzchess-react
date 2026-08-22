import { apiClient } from "./axios";
import type { PaginatedResult, PageQueryParams } from "../types/pagination.types";
import type {Author} from "../types/course.types.ts";


interface AuthorListParams extends PageQueryParams {
  search?: string;
}


export async function getAuthors(params: AuthorListParams = {}) {
  const { data } = await apiClient.get<PaginatedResult<Author>>("/authors/list", {
    params,
  });
  return data;
}