import { useEffect, useState } from "react";
import { getCourseById, getCourseLessons, getCourseSections } from "../../../api/courses.api";
import { getApiErrorMessage } from "../../../lib/apiError";
import type { CourseDetail, CourseLesson, CourseSection } from "../../../types/course.types";

export function useCourseDetail(courseId: number) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
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
        const [courseResult, sectionsResult, lessonsResult] = await Promise.all([
          getCourseById(courseId),
          getCourseSections(courseId),
          getCourseLessons(courseId),
        ]);
        if (isCancelled) return;
        setCourse(courseResult);
        setSections(sectionsResult);
        setLessons(lessonsResult);
      } catch (err) {
        if (isCancelled) return;
        setError(getApiErrorMessage(err, "Kurs ma'lumotlarini yuklashda xatolik yuz berdi."));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  return { course, sections, lessons, isLoading, error };
}