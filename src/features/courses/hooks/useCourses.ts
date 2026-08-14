import { useEffect, useRef, useState } from "react";
import { getCourses } from "../../../api/courses.api";
import { getApiErrorMessage } from "../../../lib/apiError";
import type { Course, CourseListParams } from "../../../types/course.types";

const COURSES_PAGE_SIZE = 4;

export interface CourseFiltersState {
  search: string;
  categoryId?: number;
  authorId?: number;
  difficultyId?: number;
  languageId?: number;
}

function buildParams(filters: CourseFiltersState, page: number): CourseListParams {
  return {
    page,
    size: COURSES_PAGE_SIZE,
    search: filters.search || undefined,
    categoryId: filters.categoryId,
    authorId: filters.authorId,
    difficultyId: filters.difficultyId,
    languageId: filters.languageId,
  };
}

export function useCourses({ search, categoryId, authorId, difficultyId, languageId }: CourseFiltersState) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentPageRef = useRef(1);

  const activeFilters: CourseFiltersState = { search, categoryId, authorId, difficultyId, languageId };

  useEffect(() => {
    let isCancelled = false;
    currentPageRef.current = 1;

    async function loadFirstPage() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCourses(buildParams({ search, categoryId, authorId, difficultyId, languageId }, 1));
        if (isCancelled) return;
        setCourses(result.data);
        setHasNext(result.hasNext);
      } catch (err) {
        if (isCancelled) return;
        setError(getApiErrorMessage(err, "Kurslarni yuklashda xatolik yuz berdi."));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadFirstPage();
    return () => {
      isCancelled = true;
    };
  }, [search, categoryId, authorId, difficultyId, languageId]);

  async function loadMore() {
    if (!hasNext || isLoadingMore) return;
    const nextPage = currentPageRef.current + 1;
    setIsLoadingMore(true);
    try {
      const result = await getCourses(buildParams(activeFilters, nextPage));
      currentPageRef.current = nextPage;
      setCourses((prev) => [...prev, ...result.data]);
      setHasNext(result.hasNext);
    } catch (err) {
      setError(getApiErrorMessage(err, "Ko'proq kurs yuklashda xatolik yuz berdi."));
    } finally {
      setIsLoadingMore(false);
    }
  }

  return { courses, isLoading, isLoadingMore, error, hasNext, loadMore };
}