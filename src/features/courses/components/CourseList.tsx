import { CourseCard } from "./CourseCard.tsx";
import { CourseCardSkeleton } from "./CourseCardSkeleton.tsx";
import { CourseEmptyState } from "./CourseEmptyState.tsx";
import type { Course, Difficulty } from "../../../types/course.types";

interface Props {
  courses: Course[];
  difficulties: Difficulty[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasNext: boolean;
  likedIds: Set<number>;
  onToggleLike: (courseId: number) => void;
  onLoadMore: () => void;
}

export function CourseList({
                             courses,
                             difficulties,
                             isLoading,
                             isLoadingMore,
                             error,
                             hasNext,
                             likedIds,
                             onToggleLike,
                             onLoadMore,
                           }: Props) {
  const difficultyIconById = new Map(difficulties.map((d) => [d.id, d.icon]));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 text-center text-[#8B8E91] text-[14px]">
        {error}
      </div>
    );
  }

  if (courses.length === 0) {
    return <CourseEmptyState />;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            difficultyIcon={difficultyIconById.get(course.difficulty.id)}
            isLiked={likedIds.has(course.id)}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>

      {hasNext && (
        <div className="flex justify-center mt-[-2px]">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="w-[131px] h-[40px] px-8 bg-[#292B2E] rounded-lg text-[14px] hover:bg-[#33363A] transition disabled:opacity-50"
          >
            {isLoadingMore ? "..." : "Ko'proq"}
          </button>
        </div>
      )}
    </>
  );
}