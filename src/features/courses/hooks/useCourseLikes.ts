import { useState } from "react";
import { toggleCourseLike } from "../../../api/courses.api";

export function useCourseLikes() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  function toggleLike(courseId: number) {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });

    toggleCourseLike(courseId).catch(() => {
    });
  }

  return { likedIds, toggleLike };
}