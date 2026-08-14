import type { Course } from "../../../types/course.types";
import { formatPrice } from "../../../lib/formatPrice";

interface Props {
  course: Course;
  difficultyIcon?: string;
  isLiked: boolean;
  onToggleLike: (courseId: number) => void;
}
function getLanguageTitle(title: string) {
  if (title === "Ruscha") return "РУ";
  if (title === "O'zbekcha") return "O'z";

  return title;
}

export function CourseCard({
                             course,
                             difficultyIcon,
                             isLiked,
                             onToggleLike,
                           }: Props) {
  const price = Number(course.price);
  const newPrice = Number(course.newPrice ?? 0);

  const hasDiscount = newPrice > 0 && newPrice < price;


  const finalPrice = hasDiscount ? newPrice : price;

  const isFree = finalPrice === 0;


  const discountLabel = hasDiscount
    ? formatPrice(price)
    : "";


  const priceLabel = isFree
    ? "Bepul kurs"
    : formatPrice(finalPrice);

  return (
    <div className="flex w-[676px] h-[189px] bg-[#1A1D1F] rounded-2xl p-5">


      <div className="relative">
        <img
          src={`http://localhost:8000/uploads/course/${course.image}`}
          alt={course.title}
          className="w-[185px] h-[141px] rounded-xl object-cover"
        />

        {/* RATING */}
        <div className="w-[53px] h-[29px] absolute top-1 left-2 flex items-center gap-1 bg-[#0B141899] px-2 py-1 rounded-lg">
          <img
            src="/icons/Star.svg"
            alt="star"
            className="w-4 h-4"
          />

          <p className="text-white text-sm font-medium">
            {Number(course.rating ?? 0).toFixed(1)}
          </p>
        </div>

        <div className="absolute top-28 left-3 w-[32px] h-[22px] bg-[#1A1D1F] px-1 py-1 rounded-lg">
          <p className="text-center bg-[#1A1D1F] text-white text-[12px]">
            {getLanguageTitle(course.language.title)}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 ml-6">

        <div>
          <h2 className="text-[20px] font-bold text-[#F7F9FA] hover:text-[#1C92E0] transition">
            {course.title}
          </h2>

          <p className="text-[14px] text-[#F7F9FA99]/60">
            {course.author.fullName}
          </p>

          {discountLabel && (
            <p className="mt-3 text-[13px] text-[#8B8E91] line-through decoration-red-500">
              {discountLabel}
            </p>
          )}

          <p className="text-[15px] font-bold text-[#82CC27]">
            {priceLabel}
          </p>
        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">

            <div className="flex items-center gap-1">
              <img
                src={difficultyIcon ?? "/icons/level.svg"}
                alt="level"
                className="w-6 h-6"
              />
              <p className="text-[#F7F9FA99] pr-2 border-r border-[#55595C]">
                {course.difficulty.title}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <img
                src="/icons/stage.svg"
                alt="stage"
                className="w-6 h-6"
              />

              <p className="text-[14px] text-[#F7F9FA99] pr-2 border-r border-[#55595C]">
                {course.sectionsCount} ta bo'lim
              </p>
            </div>

            <div className="flex items-center gap-1">
              <img
                src="/icons/list.svg"
                alt="list"
                className="w-6 h-6"
              />

              <p className="text-[#F7F9FA99]">
                {course.category.title}
              </p>
            </div>

          </div>

          <div className="mt-1">
            <button
              type="button"
              onClick={() => onToggleLike(course.id)}
              aria-label="like"
            >
              <img
                src={isLiked ? "/icons/heart-red.svg" : "/icons/heart.svg"}
                className="w-[19.4px] h-[18px] cursor-pointer"
                alt="like"
              />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}