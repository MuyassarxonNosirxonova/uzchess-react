import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { isAxiosError } from "axios";
import { Layout } from "../../common/components/Layout.tsx";
import { useCourseDetail } from "../hooks/useCourseDetail.ts";
import { useCourseReviews} from "../hooks/useCourseReview.ts";
import { purchaseCourse, toggleCourseLike } from "../../../api/courses.api.ts";
import { formatPrice } from "../../../lib/formatPrice.ts";
import { useAuth } from "../../auth/context/useAuth.ts";
import type { CourseLesson } from "../../../types/course.types.ts";

function formatReviewDate(iso: string) {
  const date = new Date(iso);

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} y. ${hours}:${minutes}`;
}

function formatDuration(seconds: number | null) {
  if (!seconds) return null;
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

function initialsOf(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function StarRow({ value, size = "w-4 h-4" }: { value: number; size?: string }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src="/icons/Star.svg"
          alt="star"
          className={`${size} ${i < rounded ? "" : "opacity-30"}`}
        />
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { course, sections, lessons, isLoading, error } = useCourseDetail(courseId);
  const {
    reviews,
    isLoading: reviewsLoading,
    hasNext: hasMoreReviews,
    loadMore: loadMoreReviews,
    isLoadingMore: isLoadingMoreReviews,
  } = useCourseReviews(courseId);

  const [openSectionId, setOpenSectionId] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [justPurchased, setJustPurchased] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const effectiveOpenSectionId = openSectionId ?? sections[0]?.id ?? null;

  async function handlePurchase() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPurchaseError(null);
    setIsPurchasing(true);
    try {
      await purchaseCourse(courseId);
      setJustPurchased(true);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setPurchaseError("Siz bu kursni allaqachon sotib olgansiz.");
      } else if (isAxiosError(err) && err.response?.status === 400) {
        setPurchaseError("Bu kurs hozircha sotib olish uchun mavjud emas.");
      } else if (isAxiosError(err) && !err.response) {
        setPurchaseError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setPurchaseError("Sotib olishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    } finally {
      setIsPurchasing(false);
    }
  }

  function handleToggleLike() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsLiked((prev) => !prev);
    toggleCourseLike(courseId).catch(() => {
      setIsLiked((prev) => !prev);
    });
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: course?.title, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA] flex items-center justify-center">
          <p className="text-[#8B8E91]">Yuklanmoqda...</p>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA] flex flex-col items-center justify-center gap-4">
          <p className="text-[#8B8E91]">{error ?? "Kurs topilmadi."}</p>
          <Link to="/courses" className="text-[#1C92E0]">
            Kurslar ro'yxatiga qaytish
          </Link>
        </div>
      </Layout>
    );
  }

  const price = Number(course.price);
  const newPrice = Number(course.newPrice ?? 0);
  const hasDiscount = newPrice > 0 && newPrice < price;
  const finalPrice = hasDiscount ? newPrice : price;
  const isOwned = course.isPurchased || justPurchased;

  const lessonsBySectionId = new Map<number, CourseLesson[]>();
  for (const lesson of lessons) {
    const list = lessonsBySectionId.get(lesson.courseSectionId) ?? [];
    list.push(lesson);
    lessonsBySectionId.set(lesson.courseSectionId, list);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA]">
        <div className="w-[1376px] px-8 mx-auto mt-4 flex items-center gap-2 text-[13px]">
          <Link to="/">
            <img src="/icons/home.svg" alt="home" className="w-5 h-5" />
          </Link>
          <span className="text-[#8B8E91]">Asosiy</span>
          <img src="/icons/iconcha.svg" alt="iconcha" className="w-3 h-3" />
          <Link to="/courses" className="text-[#8B8E91] hover:text-[#F7F9FA] transition">
            Kurslar
          </Link>
          <img src="/icons/iconcha.svg" alt="iconcha" className="w-3 h-3" />
          <span className="text-[#F7F9FA]">{course.title}</span>
        </div>
        <div
          className="w-[1376px] mx-auto mt-4 rounded-lg border border-[#25292C] p-6 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(11,16,20,0.92), rgba(11,16,20,0.75)), url(http://localhost:8000/uploads/course/${course.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[28px] font-bold">{course.title}</h1>

              <div className="flex items-center gap-2 mt-3">
                <img src="/icons/course.svg" alt="price" className="w-6 h-6" />
                <span className="text-[18px] font-bold">{formatPrice(finalPrice)}</span>
                {hasDiscount && (
                  <span className="text-[14px] text-[#8B8E91] line-through decoration-red-500">
                    {formatPrice(price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 text-[14px] text-[#8B8E91]">
                <div className="flex items-center gap-1">
                  <img src="/icons/level.svg" alt="level" className="w-5 h-5" />
                  {course.difficulty.title}
                </div>
                <div className="flex items-center gap-1 pl-3 border-l border-[#55595C]">
                  <img src="/icons/stage.svg" alt="stage" className="w-5 h-5" />
                  {course.sectionsCount} ta bo'lim
                </div>
                <div className="flex items-center gap-1 pl-3 border-l border-[#55595C]">
                  <img src="/icons/list.svg" alt="list" className="w-5 h-5" />
                  {course.lessonsCount} ta dars
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-2">
                <StarRow value={Number(course.rating ?? 0)} />
                <span className="text-[16px] font-medium">{Number(course.rating ?? 0).toFixed(1)}</span>
                <span className="text-[13px] text-[#8B8E91]">({course.reviewsCount} ta izoh)</span>
              </div>

              <div className="flex items-center gap-2">
                {isOwned ? (
                  <span className="text-[#82CC27] text-[15px] font-medium flex items-center gap-1">
                    ✓ Sotib olingan
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={isPurchasing}
                    className="h-10 px-8 bg-[#1C92E0] hover:bg-blue-900 rounded-md font-medium transition disabled:opacity-50"
                  >
                    {isPurchasing ? "Yuborilmoqda..." : "Kursni sotib olish"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleLike}
                  className="w-10 h-10 flex items-center justify-center border border-[#55595C] rounded-md"
                  aria-label="like"
                >
                  <img
                    src={isOwned ? "/icons/eye-outline.svg" : isLiked ? "/icons/heart-red.svg" : "/icons/heart.svg"}
                    className="w-5 h-5"
                    alt=""
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-10 h-10 flex items-center justify-center border border-[#55595C] rounded-md"
                  aria-label="share"
                >
                  <img src="/icons/right-arrow.svg" className="w-5 h-5" alt="" />
                </button>
              </div>

              {purchaseError && <p className="text-[13px] text-red-400 max-w-[260px] text-right">{purchaseError}</p>}
            </div>
          </div>
        </div>

        <div className="w-[1376px] mx-auto mt-6 flex gap-[17px] items-start">
          <div className="flex-1 flex flex-col gap-6">
            <div className="border border-[#25292C] rounded-lg overflow-hidden">
              {sections.length === 0 && (
                <p className="p-6 text-[14px] text-[#8B8E91]">Bu kurs uchun hali bo'limlar qo'shilmagan.</p>
              )}

              {sections.map((section, index) => {
                const isOpen = section.id === effectiveOpenSectionId;
                const sectionLessons = lessonsBySectionId.get(section.id) ?? [];

                return (
                  <div key={section.id} className="border-b border-[#25292C] last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenSectionId(isOpen ? null : section.id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1A1D1F] transition"
                    >
                      <span className="text-[16px] font-bold">
                        {index + 1}. {section.title}
                      </span>
                      <img
                        src="/icons/chevron-down.svg"
                        alt="toggle"
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-3 gap-4">
                        {sectionLessons.length === 0 && (
                          <p className="text-[13px] text-[#8B8E91]">Bu bo'limda hali darslar yo'q.</p>
                        )}

                        {sectionLessons.map((lesson) => {
                          const isLocked = !lesson.isFree && !isOwned;
                          const progressPercent =
                            lesson.duration && lesson.stoppedAt
                              ? Math.min(100, Math.round((lesson.stoppedAt / lesson.duration) * 100))
                              : 0;
                          const durationLabel = formatDuration(lesson.duration);

                          const card = (
                            <div className="flex flex-col gap-2">
                              <div
                                className="relative w-[312px] h-[153px] rounded-lg bg-[#151719] bg-cover bg-center flex items-center justify-center overflow-hidden"
                                style={
                                  lesson.thumbnail
                                    ? {
                                      backgroundImage: `url(http://localhost:8000/uploads/video/${lesson.thumbnail})`,
                                    }
                                    : undefined
                                }
                              >
                                {!lesson.thumbnail && (
                                  <img src="/icons/level.svg" alt="" className="w-10 h-10 opacity-70" />
                                )}

                                {durationLabel && (
                                  <span className="absolute bottom-2 left-2 text-[12px] bg-black/60 px-1.5 py-0.5 rounded">
                                    {durationLabel}
                                  </span>
                                )}

                                {isLocked && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-[24px]">🔒</span>
                                  </div>
                                )}

                                {lesson.isCompleted && (
                                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#82CC27] text-[#0F1113] text-[12px] font-bold flex items-center justify-center">
                                    ✓
                                  </span>
                                )}

                                {progressPercent > 0 && (
                                  <div
                                    className={`absolute bottom-0 left-0 h-[3px] ${lesson.isCompleted ? "bg-[#82CC27]" : "bg-[#1C92E0]"}`}
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                )}
                              </div>
                              <span className="text-[14px]">{lesson.title}</span>
                            </div>
                          );

                          if (isLocked) {
                            return (
                              <div key={lesson.id} className="cursor-not-allowed opacity-90">
                                {card}
                              </div>
                            );
                          }

                          return (
                            <Link key={lesson.id} to={`/courses/${course.id}/lessons/${lesson.id}`}>
                              {card}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <h2 className="text-[22px] font-bold mb-4">Kurs haqida izohlar</h2>

              <div className="flex flex-col gap-4">
                {reviewsLoading && reviews.length === 0 && (
                  <p className="text-[14px] text-[#8B8E91]">Yuklanmoqda...</p>
                )}

                {!reviewsLoading && reviews.length === 0 && (
                  <p className="text-[14px] text-[#8B8E91]">Bu kurs uchun hali izoh qoldirilmagan.</p>
                )}

                {reviews.map((review) => (
                  <div key={review.id} className="border border-[#25292C] rounded-lg p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1C92E0] flex items-center justify-center text-[14px] font-bold flex-shrink-0">
                          {initialsOf(review.user.fullName)}
                        </div>
                        <div>
                          <p className="text-[15px] font-medium">{review.user.fullName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[12px] text-[#8B8E91]">{formatReviewDate(review.createdAt)}</span>
                            <StarRow value={review.rating} size="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-[14px] text-[#8B8E91] mt-3 leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>

              {hasMoreReviews && (
                <button
                  type="button"
                  onClick={loadMoreReviews}
                  disabled={isLoadingMoreReviews}
                  className="mt-4 w-full h-11 bg-[#1A1D1F] hover:bg-[#1E2124] border border-[#25292C] rounded-lg text-[14px] transition disabled:opacity-50"
                >
                  {isLoadingMoreReviews ? "Yuklanmoqda..." : "Barcha izohlar"}
                </button>
              )}
            </div>
          </div>

          <div className="w-[326px] flex-shrink-0 flex flex-col gap-6">
            <div className="w-[326px] h-[192px] rounded-lg bg-[#0B4789] relative p-3 flex flex-col gap-3">
              <div className="flex-col justify-between">
                <div className="flex items-center gap-2">
                  <img src="/icons/yoshlar.svg" alt="yoshlar" className="w-8 h-8" />
                  <p className="text-white text-[12px] leading-4">
                    Yoshlar <br /> portali
                  </p>
                </div>
                <img src="/icons/Vector.svg" alt="vector" className="absolute top-0 right-0 rounded-lg" />
              </div>

              <h1 className="text-[20px] text-[#F7F9FA]">
                Aynan <span className="text-[#FFDF00] text-[20px] font-bold">siz</span> uchun qanday imtiyozlar
                borligini bilib oling
              </h1>

              <div className="mt-3 flex items-center gap-2 w-[149px] h-[40px] bg-[#1C92E0] rounded-lg px-8">
                <button className="text-[#F7F9FA] text-[16px]">Batafsil</button>
                <img src="/icons/arrow-circle.svg" alt="arrow" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}