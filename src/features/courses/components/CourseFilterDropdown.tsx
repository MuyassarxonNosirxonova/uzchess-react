import {useEffect, useRef, useState} from "react";

export interface FilterOption {
  id: number;
  label: string;
}

interface Props {
  label: string;
  options: FilterOption[];
  selectedId?: number;
  onChange: (id: number | undefined) => void;
  placeholder?: string;
}

export function CourseFilterDropdown({label, options, selectedId, onChange, placeholder = "Barchasi"}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.id === selectedId)?.label ?? placeholder;

  return (
    <div className="mb-5">
      <p className="text-[12px] tracking-[1px] text-[#8B8E91] mb-3">{label}</p>

      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-[286px] h-[54px] bg-[#151719] border border-[#292D30] rounded-lg px-3 flex items-center justify-between text-[16px]"
        >
          <span className={selectedId ? "" : "text-[#8B8E91]"}>{selectedLabel}</span>
          <img
            src="/icons/chevron-down.svg"
            alt="down"
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-[286px] max-h-[240px] overflow-y-auto bg-[#151719] border border-[#292D30] rounded-lg py-1">
            <button
              type="button"
              onClick={() => {
                onChange(undefined);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[14px] hover:bg-[#1C92E0]/10 ${!selectedId ? "text-[#1C92E0]" : "text-[#F7F9FA]"}`}
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[14px] hover:bg-[#1C92E0]/10 ${selectedId === option.id ? "text-[#1C92E0]" : "text-[#F7F9FA]"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}