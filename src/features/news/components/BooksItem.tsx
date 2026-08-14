interface Props{
    image: string;
    title: string;
    author: string;
}
export function BooksItem({image, title, author}: Props){
    return <div className="flex gap-3 items-center">
        <img src={image} alt="book image" className=" rounded-md object-cover" />
        <div className="flex flex-col">
            <a href="/books"> <h4 className="text-[15px] text-[#FCFCFC] font-medium line-clamp-2 hover:text-[#1C92E0] transition">
                {title}
            </h4></a>
            <p className="text-[13px] text-white/40">{author}</p>
        </div>
    </div>
}