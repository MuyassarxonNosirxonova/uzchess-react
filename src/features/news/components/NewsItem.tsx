interface Props {
  image: string;
  title: string;
  date: string;
  content?: string;
}

export function NewsItem({ image, title, date, content }: Props) {
  const time = new Date(date);
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
  ];
  const formattedDate = `${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;

  const imageUrl = image.startsWith("http://") || image.startsWith("https://")
    ? image
    : `http://localhost:8000/uploads/images/${image}`;

  return (
    <div className="flex flex-col  gap-3 w-full h-[251px] bg-[#1A1D1F] rounded-[8px] p-2">
      <img src={imageUrl} alt="news image" className="w-full h-28.25 rounded-t-lg object-cover" />
      <section className="flex flex-col justify-start items-start gap-1.5">
        <p className="text-[14px] text-[#FFFFFF]/40">{formattedDate}</p>
        <h2 className=" w-full line-clamp-2 text-[14px] text-wrap break-all font-medium text-white  hover:text-[1C92E0] hover:text-[#1C92E0] transition ">
          {title}
        </h2>
        {content && (
          <p className="text-[13px] text-[#9DA1A3] line-clamp-2">{content}</p>
        )}
      </section>
    </div>
  );
}