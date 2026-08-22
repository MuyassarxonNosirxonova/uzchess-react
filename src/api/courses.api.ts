import { apiClient } from "./axios";
import type { PaginatedResult } from "../types/pagination.types";
import type {
  Course,
  CourseDetail,
  CourseListParams,
  CourseSection,
  CourseLesson,
  CourseReview,
  LessonDetail,
} from "../types/course.types";

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

export async function getCourseSections(courseId: number) {
  const { data } = await apiClient.get<CourseSection[]>(`/courses/${courseId}/sections`);
  return data;
}

export async function getCourseLessons(courseId: number) {
  const { data } = await apiClient.get<CourseLesson[]>(`/courses/${courseId}/lessons`);
  return data;
}

export async function purchaseCourse(courseId: number) {
  await apiClient.post(`/courses/${courseId}/purchase`);
}

export async function getCourseReviews(courseId: number, page: number, size = 4) {
  const { data } = await apiClient.get<PaginatedResult<CourseReview>>(`/courses/${courseId}/reviews`, {
    params: { page, size },
  });
  return data;
}

export async function getLessonById(courseId: number, lessonId: number) {
  const { data } = await apiClient.get<LessonDetail>(`/courses/${courseId}/lessons/${lessonId}`);
  return data;
}

export async function updateLessonProgress(
  lessonId: number,
  payload: { stoppedAt?: number; isCompleted?: boolean },
) {
  await apiClient.patch(`/course-lessons/${lessonId}/progress`, payload);
}