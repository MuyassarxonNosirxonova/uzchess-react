import { CourseFilterDropdown } from "./CourseFilterDropdown.tsx";
import type { CourseCategory, Difficulty, Language } from "../../../types/course.types";
import type { CourseFiltersState } from "../hooks/useCourses.ts";

interface Props {
  filters: CourseFiltersState;
  categories: CourseCategory[];
  difficulties: Difficulty[];
  languages: Language[];
  onDifficultyChange: (id: number | undefined) => void;
  onCategoryChange: (id: number | undefined) => void;
  onLanguageChange: (id: number | undefined) => void;
  onReset: () => void;
}

export function CourseFilterPanel({filters, categories, difficulties, languages, onDifficultyChange, onCategoryChange, onLanguageChange, onReset,}: Props) {
  return (
    <div className="w-[334px] h-[489px] bg-[#1A1D1F] rounded-lg border border-[#25292C] p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-medium">Filter</h2>
        <button onClick={onReset} className="text-[#1C92E0] text-[16px]">
          Tozalash
        </button>
      </div>

      <CourseFilterDropdown
        label="DARAJANI TANLANG:"
        options={difficulties.map((d) => ({ id: d.id, label: d.title }))}
        selectedId={filters.difficultyId}
        onChange={onDifficultyChange}/>

      <CourseFilterDropdown
        label="KATEGORIYA:"
        options={categories.map((c) => ({ id: c.id, label: c.title }))}
        selectedId={filters.categoryId}
        onChange={onCategoryChange}/>

      <CourseFilterDropdown
        label="DARSLIK TILI:"
        options={languages.map((l) => ({ id: l.id, label: l.title }))}
        selectedId={filters.languageId}
        onChange={onLanguageChange}/>

      <div>
        <p className="text-[12px] tracking-[1px] text-[#8B8E91] mb-3">REYTING:</p>
        <div className="w-[286px] h-[54px] bg-[#151719] border border-[#292D30] rounded-lg flex items-center justify-center gap-4">
          <img src="/icons/unstar.svg" className="w-6 h-6 opacity-20" alt="star" />
          <img src="/icons/unstar.svg" className="w-6 h-6 opacity-20" alt="star" />
          <img src="/icons/unstar.svg" className="w-6 h-6 opacity-20" alt="star" />
          <img src="/icons/unstar.svg" className="w-6 h-6 opacity-20" alt="star" />
          <img src="/icons/unstar.svg" className="w-6 h-6 opacity-20" alt="star" />
        </div>
      </div>
    </div>
  );
}