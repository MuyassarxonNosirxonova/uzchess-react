export function ProjectDonationCard() {
  return (
    <div className="w-[326px] h-[82px] bg-[#1A1D1F] rounded-lg flex items-center px-4 gap-3">
    <img src="/icons/project.svg" alt="project" className="w-[42px] h-[42px]" />
  <div className="flex-1">
  <div className="flex items-center gap-[33px]">
  <p className="text-[13px] whitespace-nowrap">Loyiha rivojiga hissa</p>
  <span className="flex items-center w-[41px] h-[16px] px-2 py-0.5 rounded bg-[#1C92E0] text-[12px] text-[#F7F9FA]">
    soon
    </span>
    </div>
    <p className="text-[14px] text-[#6F767E]">Shaxmat rivojiga hissa qo'shing</p>
  </div>
  </div>
);
}