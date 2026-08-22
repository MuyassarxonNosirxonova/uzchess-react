import { useEffect, useState } from "react";
import { getCourseReviews } from "../../../api/courses.api";
import type { CourseReview } from "../../../types/course.types";

export function useCourseReviews(courseId: number, pageSize = 4) {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const result = await getCourseReviews(courseId, 1, pageSize);
        if (isCancelled) return;
        setReviews(result.data);
        setHasNext(result.hasNext);
        setPage(1);
      } catch {
        if (isCancelled) return;
        setReviews([]);
        setHasNext(false);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [courseId, pageSize]);

  async function loadMore() {
    if (isLoadingMore || !hasNext) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await getCourseReviews(courseId, nextPage, pageSize);
      setReviews((prev) => [...prev, ...result.data]);
      setHasNext(result.hasNext);
      setPage(nextPage);
    } catch {
    } finally {
      setIsLoadingMore(false);
    }
  }

  return { reviews, isLoading, isLoadingMore, hasNext, loadMore };
}