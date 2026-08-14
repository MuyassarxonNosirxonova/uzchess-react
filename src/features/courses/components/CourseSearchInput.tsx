interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function CourseSearchInput({ value, onChange }: Props) {
  return (
    <div className="relative w-full h-[52px]">
      <img src="/icons/search.svg" alt="search"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"/>

      <input type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Izlash"
        className="w-full h-full pl-12 pr-4 bg-[#151719] border border-[#25292C] rounded-lg text-[#F7F9FA] outline-none placeholder:text-[#8B8E91] focus:border-[#1C92E0]"
      />
    </div>
  );
}