import { useEffect, useState } from "react";
import { getCourseCategories } from "../../../api/courseCategories.api";
import { getDifficulties } from "../../../api/difficulties.api";
import { getLanguages } from "../../../api/languages.api";
import type { CourseCategory, Difficulty, Language } from "../../../types/course.types";


const FILTER_OPTIONS_PAGE_SIZE = 100;

interface CourseFilterOptionsState {
  categories: CourseCategory[];
  difficulties: Difficulty[];
  languages: Language[];
  isLoading: boolean;
}

export function useCourseFilterOptions(): CourseFilterOptionsState {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadOptions() {
      try {
        const [categoriesResult, difficultiesResult, languagesResult] = await Promise.all([
          getCourseCategories({ size: FILTER_OPTIONS_PAGE_SIZE }),
          getDifficulties({ size: FILTER_OPTIONS_PAGE_SIZE }),
          getLanguages(),
        ]);

        if (isCancelled) return;
        setCategories(categoriesResult.data);
        setDifficulties(difficultiesResult.data);
        setLanguages(languagesResult);
      } catch {

      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadOptions();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { categories, difficulties, languages, isLoading };
}