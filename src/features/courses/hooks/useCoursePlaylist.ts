import { useCallback, useEffect, useState } from "react";
import { getCourseLessons, getCourseSections } from "../../../api/courses.api";
import type { CourseLesson, CourseSection } from "../../../types/course.types";

export function useCoursePlaylist(courseId: number) {
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [sectionsResult, lessonsResult] = await Promise.all([
          getCourseSections(courseId),
          getCourseLessons(courseId),
        ]);
        if (isCancelled) return;
        setSections(sectionsResult);
        setLessons(lessonsResult);
      } catch {
        if (isCancelled) return;
        setError("Darslar ro'yxatini yuklashda xatolik yuz berdi.");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  const refresh = useCallback(async () => {
    try {
      const [sectionsResult, lessonsResult] = await Promise.all([
        getCourseSections(courseId),
        getCourseLessons(courseId),
      ]);
      setSections(sectionsResult);
      setLessons(lessonsResult);
    } catch {

    }
  }, [courseId]);
  const sectionOrder = new Map(sections.map((s, i) => [s.id, s.order ?? i]));
  const orderedLessons = [...lessons].sort((a, b) => {
    const sectionDiff = (sectionOrder.get(a.courseSectionId) ?? 0) - (sectionOrder.get(b.courseSectionId) ?? 0);
    if (sectionDiff !== 0) return sectionDiff;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  return { sections, orderedLessons, isLoading, error, refresh };
}