
export function CourseEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <img src="/images/empty-state.png" alt="Ma'lumot topilmadi" className="w-[190px] h-auto" />
      <p className="text-[22px] font-bold text-[#F7F9FA]">Hech qanday ma'lumot topilmadi</p>
    </div>
  );
}