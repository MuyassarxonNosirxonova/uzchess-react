interface Props{
image: string;
title: string;
}

export function CourseItem({image,title}: Props){
return <div className="flex gap-3 items-center">
    <img src={image} alt="course image" className="w-20 h-20 rounded-md object-cover"/>
    <div className="flex flex-col ">
        <a href="/course"><h4 className="text-[14px] font-medium line-clamp-2 text-[#FCFCFC] hover:text-blue-500 transition">
            {title}
        </h4></a>
        <div className="flex gap-2 items-center">
            <img src="/icons/Star.svg" alt="Star" className="w-[13.33px] h-[13.33px]"/>
            <h4 className=" text-[#FCFCFC] font-medium">3.5</h4>
        </div>
       <div className="flex gap-2 items-center">
           <img src="/icons/eye-outline.svg" alt="views" className="w-4 h-4 "/>
           <h4 className=" text-[#FCFCFC]/70">5 756</h4>
       </div>
    </div>
</div>
}