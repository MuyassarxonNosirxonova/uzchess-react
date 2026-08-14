import { apiClient } from "./axios";
import type { PaginatedResult } from "../types/pagination.types";
import type { Course, CourseDetail, CourseListParams } from "../types/course.types";

export async function getCourses(params: CourseListParams) {
  const { data } = await apiClient.get<PaginatedResult<Course>>("/courses/list", {
    params,
  });
  return data;
}

export async function getCourseById(id: number) {
  const { data } = await apiClient.get<CourseDetail>(`/courses/${id}`);
  return data;
}

export async function toggleCourseLike(id: number) {
  await apiClient.post(`/courses/${id}/like`);
}