export function BooksItem({image, title, author}){
    return <div className="flex gap-3 items-center">
        <img src={image} alt="book image" className="w-16 h-16 rounded-md object-cover" />
        <div className="flex flex-col gap-1">
            <h4 className="text-[15px] text-[#FCFCFC] font-medium">
                {title}
            </h4>
            <p className="text-[13px] text-white/40">{author}</p>
        </div>
    </div>
}