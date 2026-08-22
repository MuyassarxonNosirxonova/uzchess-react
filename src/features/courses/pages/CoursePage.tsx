import { useState } from "react";
import { Layout } from "../../common/components/Layout.tsx";
import { CourseFilterPanel } from "../components/CourseFilterPanel.tsx";
import { CourseSearchInput } from "../components/CourseSearchInput.tsx";
import { CourseList } from "../components/CourseList.tsx";
import { useCourses } from "../hooks/useCourses.ts";
import type { CourseFiltersState } from "../hooks/useCourses.ts";
import { useCourseFilterOptions } from "../hooks/useCourseFilterOptions.ts";
import { useCourseLikes } from "../hooks/useCourseLikes.ts";
import {useDebouncedSearch} from "../../../lib/seDebouncedSearch.ts";
import { YoungPortal} from "../../common/components/YoungPortal.tsx";
import { ProjectDonationCard } from "../../common/components/ProjectDonationCard.tsx";


export default function CoursePage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedSearch(searchInput, 400);

  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [difficultyId, setDifficultyId] = useState<number | undefined>();
  const [languageId, setLanguageId] = useState<number | undefined>();

  const filters: CourseFiltersState = {
    search: debouncedSearch,
    categoryId,
    difficultyId,
    languageId,
  };

  const { categories, difficulties, languages } = useCourseFilterOptions();
  const { courses, isLoading, isLoadingMore, error, hasNext, loadMore } = useCourses(filters);
  const { likedIds, toggleLike } = useCourseLikes();

  function handleReset() {
    setSearchInput("");
    setCategoryId(undefined);
    setDifficultyId(undefined);
    setLanguageId(undefined);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA]">

        <div className="w-[1376px] px-8 mx-auto mt-4 flex items-center gap-2 text-[13px]">
          <img src="/icons/home.svg" alt="home" className="w-5 h-5" />
          <span className="text-[#8B8E91]">Asosiy</span>
          <img src="icons/iconcha.svg" alt="iconcha" className="w-3 h-3" />
          <span className="text-[#F7F9FA]">Kurslar</span>
        </div>

        <div className="w-[1376px] mx-auto mt-6 flex gap-[17px]">
          <div className="w-[326px] flex-shrink-0 flex flex-col gap-5">

            <div className="flex items-center gap-3 px-19 w-[326px] h-[100px] bg-[#1A1D1F] rounded-lg border border-[#25292C]">
              <img src="/icons/course.svg" alt="course" className="w-[44px] h-[44px] " />
              <h1 className="text-[30px] font-bold">Kurslar</h1>
            </div>

            <CourseFilterPanel
              filters={{ search: debouncedSearch, categoryId, difficultyId, languageId }}
              categories={categories}
              difficulties={difficulties}
              languages={languages}
              onDifficultyChange={setDifficultyId}
              onCategoryChange={setCategoryId}
              onLanguageChange={setLanguageId}
              onReset={handleReset}
            />
          </div>

          <div className="w-[676px] flex-shrink-0 flex flex-col gap-5">
            <CourseSearchInput value={searchInput} onChange={setSearchInput} />

            <CourseList
              courses={courses}
              difficulties={difficulties}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              error={error}
              hasNext={hasNext}
              likedIds={likedIds}
              onToggleLike={toggleLike}
              onLoadMore={loadMore}
            />
          </div>

          <div className="w-[326px] flex-shrink-0 flex flex-col gap-6">

            <YoungPortal />

            <ProjectDonationCard />
          </div>

        </div>
      </div>
    </Layout>
  );
}