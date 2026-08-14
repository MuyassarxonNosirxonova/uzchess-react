import { apiClient } from "./axios";
import type { PaginatedResult, PageQueryParams } from "../types/pagination.types";
import type {CourseCategory} from "../types/coursecategory.types.ts";


interface CourseCategoryListParams extends PageQueryParams {
  search?: string;
}

export async function getCourseCategories(params: CourseCategoryListParams = {}) {
  const { data } = await apiClient.get<PaginatedResult<CourseCategory>>(
    "/course-categories/list",
    { params },
  );
  return data;
}