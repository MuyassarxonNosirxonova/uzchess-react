
interface Props{
    image: string;
    title: string;
    text: string;
}
export function NewsItem({image,title,text}: Props){
    return <div className="flex flex-col  gap-3 w-full h-[251px] bg-[#1A1D1F] rounded-[8px] p-2">
        <img src={image} alt="news image" className="w-full h-28.25 rounded-t-lg object-cover" />
        <section className= "flex flex-col justify-start items-start gap-1.5">
            <p className="text-[14px] text-[#FFFFFF]/40" >
                Sentabr 7, 2022
            </p>
            <a href="/news"><h2 className=" w-full line-clamp-2 text-[14px] text-wrap break-all font-medium text-white  hover:text-[1C92E0] hover:text-[#1C92E0] transition ">
                {title}
            </h2></a>
            <h3>
                <p className="text-[14px] text-[#9DA1A3]">{text}</p>
            </h3>
        </section>
    </div>
}


