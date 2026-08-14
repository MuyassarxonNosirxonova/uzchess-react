import { useState } from "react";
import { Layout } from "../../common/components/Layout.tsx";
import { CourseFilterPanel } from "../components/CourseFilterPanel.tsx";
import { CourseSearchInput } from "../components/CourseSearchInput.tsx";
import { CourseList } from "../components/CourseList.tsx";
import { useCourses } from "../hooks/useCourses.ts";
import type { CourseFiltersState } from "../hooks/useCourses.ts";
import { useCourseFilterOptions } from "../hooks/useCourseFilterOptions.ts";
import { useCourseLikes } from "../hooks/useCourseLikes.ts";
import { useDebouncedSearch } from "../../../lib/seDebouncedSearch.ts";

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

  const { categories, difficulties, languages } =
    useCourseFilterOptions();

  const {
    courses,
    isLoading,
    isLoadingMore,
    error,
    hasNext,
    loadMore,
  } = useCourses(filters);

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
          <img src="/icons/home.svg"
            alt="home"
            className="w-5 h-5"/>
          <span className="text-[#8B8E91]">
            Asosiy
          </span>
          <img
            src="/icons/iconcha.svg"
            alt="iconcha"
            className="w-3 h-3"/>
          <span className="text-[#F7F9FA]">
            Kurslar
          </span>
        </div>

        <div className="w-[1376px] mx-auto mt-6 flex gap-[17px]">
          <div className="w-[326px] flex-shrink-0 flex flex-col gap-5">
            <div className="flex items-center gap-3 px-19 w-[326px] h-[100px] bg-[#1A1D1F] rounded-lg border border-[#25292C]">
              <img
                src="/icons/course.svg"
                alt="course"
                className="w-[44px] h-[44px]"
              />
              <h1 className="text-[30px] font-bold">
                Kurslar
              </h1>
            </div>
            <CourseFilterPanel
              filters={{
                search: debouncedSearch,
                categoryId,
                difficultyId,
                languageId,
              }}
              categories={categories}
              difficulties={difficulties}
              languages={languages}
              onDifficultyChange={setDifficultyId}
              onCategoryChange={setCategoryId}
              onLanguageChange={setLanguageId}
              onReset={handleReset}/>
          </div>
          <div className="w-[676px] flex-shrink-0 flex flex-col gap-5">
            <CourseSearchInput
              value={searchInput}
              onChange={setSearchInput}
            />
            <CourseList
              courses={courses}
              difficulties={difficulties}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              error={error}
              hasNext={hasNext}
              likedIds={likedIds}
              onToggleLike={toggleLike}
              onLoadMore={loadMore}/>
            <div className="flex justify-center mt-[-5px]">
              {!debouncedSearch && hasNext && (
                <button
                  onClick={loadMore}
                  className="w-[114px] h-[40px] self-center bg-[#292B2E] rounded-lg text-white text-[14px] hover:bg-[#33363A] transition"
                >Ko‘proq
                </button>
              )}
            </div>
          </div>

          <div className="w-[326px] flex-shrink-0 flex flex-col gap-6">
            <div className="w-[326px] h-[192px] rounded-lg bg-[#0B4789] relative p-3 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src="/icons/yoshlar.svg"
                  alt="yoshlar"
                  className="w-8 h-8"/>
                <p className="text-white text-[12px] leading-4">Yoshlar
                  <br />portali
                </p>
                <img src="/icons/Vector.svg"
                  alt="vector"
                  className="absolute top-0 right-0 rounded-lg"
                />
              </div>
              <h1 className="text-[20px] text-[#F7F9FA]">
                Aynan{" "}
                <span className="text-[#FFDF00] text-[20px] font-bold">siz</span>{" "}uchun qanday
                imtiyozlar borligini bilib oling
              </h1>
              <div className="mt-3 flex items-center gap-2 w-[149px] h-[40px] bg-[#1C92E0] rounded-lg px-8">
                <button className="text-[#F7F9FA] text-[16px]">
                  Batafsil
                </button>
                <img
                  src="/icons/arrow-circle.svg"
                  alt="arrow"
                  className="w-5 h-5"/>
              </div>
            </div>
            <div className="w-[326px] h-[82px] bg-[#1A1D1F] rounded-lg flex items-center px-4 gap-3">
              <img
                src="/icons/project.svg"
                alt="project"
                className="w-[42px] h-[42px]"/>
              <div className="flex-1">
                <div className="flex items-center gap-[33px]">
                  <p className="text-[13px] whitespace-nowrap">
                    Loyiha rivojiga hissa
                  </p>
                  <span className="flex items-center w-[41px] h-[16px] px-2 py-0.5 rounded bg-[#1C92E0] text-[12px] text-[#F7F9FA]">
                    soon
                  </span>
                </div>
                <p className="text-[14px] text-[#6F767E]">
                  Shaxmat rivojiga hissa qo‘shing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}