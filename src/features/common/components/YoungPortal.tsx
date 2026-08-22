export function YoungPortal() {
  return (
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
        Aynan <span className="text-[#FFDF00] text-[20px] font-bold">siz</span> uchun qanday imtiyozlar borligini
        bilib oling
      </h1>

      <div className="mt-3 flex items-center gap-2 w-[149px] h-[40px] bg-[#1C92E0] rounded-lg px-8">
        <button className="text-[#F7F9FA] text-[16px]">Batafsil</button>
        <img src="/icons/arrow-circle.svg" alt="arrow" className="w-5 h-5" />
      </div>
    </div>
  );
}