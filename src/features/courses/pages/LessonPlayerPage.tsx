import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { isAxiosError } from "axios";
import { Layout } from "../../common/components/Layout.tsx";
import { useCoursePlaylist } from "../hooks/useCoursePlaylist.ts";
import { getLessonById, updateLessonProgress } from "../../../api/courses.api.ts";
import type { LessonDetail } from "../../../types/course.types.ts";

function formatDuration(seconds: number | null) {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}


const PROGRESS_SAVE_INTERVAL_SECONDS = 5;

export default function LessonPlayerPage() {
  const { courseId: courseIdParam, lessonId: lessonIdParam } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const courseId = Number(courseIdParam);
  const lessonId = Number(lessonIdParam);
  const navigate = useNavigate();

  const { orderedLessons, isLoading: playlistLoading, refresh: refreshPlaylist } = useCoursePlaylist(courseId);

  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNextCard, setShowNextCard] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedTimeRef = useRef(0);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      setShowNextCard(false);
      lastSavedTimeRef.current = 0;
      try {
        const result = await getLessonById(courseId, lessonId);
        if (isCancelled) return;
        setLesson(result);
      } catch (err) {
        if (isCancelled) return;
        if (isAxiosError(err) && err.response?.status === 403) {
          setError("Bu darsni ko'rish uchun kursni sotib olishingiz kerak.");
        } else if (isAxiosError(err) && !err.response) {
          setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
        } else {
          setError("Darsni yuklashda xatolik yuz berdi.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [courseId, lessonId]);

  const currentIndex = orderedLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? orderedLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < orderedLessons.length - 1 ? orderedLessons[currentIndex + 1] : null;

  function saveProgress(stoppedAt: number, isCompleted = false) {
    updateLessonProgress(lessonId, { stoppedAt: Math.floor(stoppedAt), isCompleted }).catch(() => {});
  }

  function handleLoadedMetadata() {
    if (!videoRef.current || !lesson) return;
    if (!lesson.isCompleted && lesson.stoppedAt) {
      videoRef.current.currentTime = lesson.stoppedAt;
    }
  }

  function handleTimeUpdate() {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    if (current - lastSavedTimeRef.current >= PROGRESS_SAVE_INTERVAL_SECONDS) {
      lastSavedTimeRef.current = current;
      saveProgress(current);
    }
  }

  function handlePause() {
    if (!videoRef.current) return;
    saveProgress(videoRef.current.currentTime);
  }

  function handleEnded() {
    if (!videoRef.current) return;
    saveProgress(videoRef.current.duration, true);
    setLesson((prev) => (prev ? { ...prev, isCompleted: true } : prev));
    refreshPlaylist();
    if (nextLesson) setShowNextCard(true);
  }

  function goToLesson(id: number) {
    navigate(`/courses/${courseId}/lessons/${id}`);
  }

  if (isLoading || playlistLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA] flex items-center justify-center">
          <p className="text-[#8B8E91]">Yuklanmoqda...</p>
        </div>
      </Layout>
    );
  }

  if (error || !lesson) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA] flex flex-col items-center justify-center gap-4">
          <p className="text-[#8B8E91]">{error ?? "Dars topilmadi."}</p>
          <Link to={`/courses/${courseId}`} className="text-[#1C92E0]">
            Kurs sahifasiga qaytish
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0F1113] text-[#F7F9FA] pb-10">
        <div className="w-[1376px] px-8 mx-auto mt-4 flex items-center gap-2 text-[13px]">
          <Link to="/">
            <img src="/icons/home.svg" alt="home" className="w-5 h-5" />
          </Link>
          <span className="text-[#8B8E91]">Asosiy</span>
          <img src="/icons/iconcha.svg" alt="iconcha" className="w-3 h-3" />
          <Link to={`/courses/${courseId}`} className="text-[#8B8E91] hover:text-[#F7F9FA] transition">
            {lesson.title}
          </Link>
        </div>

        <div className="w-[1376px] mx-auto mt-4 flex gap-[17px] items-start">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-[24px] font-bold">{lesson.title}</h1>

            <video
              key={lesson.id}
              ref={videoRef}
              src={`http://localhost:8000/uploads/video/${lesson.video}`}
              controls
              className="w-full aspect-video rounded-lg bg-black"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onPause={handlePause}
              onEnded={handleEnded}
            />

            {lesson.content && (
              <p className="text-[14px] text-[#8B8E91] leading-relaxed whitespace-pre-line">{lesson.content}</p>
            )}

            <div className="flex items-center justify-between mt-2 relative">
              <button
                type="button"
                onClick={() => prevLesson && goToLesson(prevLesson.id)}
                disabled={!prevLesson}
                className="h-11 px-6 bg-[#1A1D1F] border border-[#25292C] rounded-lg text-[14px] disabled:opacity-40 hover:bg-[#1E2124] transition"
              >
                ‹ Oldingi
              </button>

              {showNextCard && nextLesson && (
                <div className="absolute bottom-full right-0 mb-3 w-[280px] bg-[#1A1D1F] border border-[#25292C] rounded-lg p-3 flex items-center gap-3">
                  <span className="text-[24px]">🏆</span>
                  <div>
                    <p className="text-[14px] font-medium">{nextLesson.title}</p>
                    <p className="text-[12px] text-[#8B8E91]">{formatDuration(nextLesson.duration)}</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => nextLesson && goToLesson(nextLesson.id)}
                disabled={!nextLesson}
                className="h-11 px-6 bg-[#1A1D1F] border border-[#25292C] rounded-lg text-[14px] disabled:opacity-40 hover:bg-[#1E2124] transition"
              >
                Keyingi ›
              </button>
            </div>
          </div>
          <div className="w-[326px] h-[413px] flex-shrink-0 flex flex-col gap-4">
            <div className="border border-[#25292C] rounded-lg max-h-[420px] overflow-y-auto">
              {orderedLessons.map((item, index) => {
                const isCurrent = item.id === lessonId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToLesson(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-[#25292C] last:border-b-0 transition ${
                      isCurrent ? "bg-[#1A1D1F]" : "hover:bg-[#1A1D1F]"
                    }`}
                  >
                    <span className="w-6 text-center flex-shrink-0">
                      {item.isCompleted ? (
                        <span className="text-[#82CC27]">✓</span>
                      ) : isCurrent ? (
                        <span className="text-[#1C92E0]">▶</span>
                      ) : (
                        <span className="text-[#8B8E91]">○</span>
                      )}
                    </span>
                    <span>
                      <p className={`text-[14px] ${isCurrent ? "text-[#F7F9FA]" : "text-[#8B8E91]"}`}>
                        {index + 1}-dars
                      </p>
                      <p className="text-[13px] text-[#55595C]">{item.title}</p>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}