import {Layout} from "../../common/components/Layout.tsx";
import {CourseItem} from "../../courses/components/CourseItem.tsx";
import {BooksItem} from "../../news/components/BooksItem.tsx";

export function MainPage(){
    return <Layout>
        <div className="flex justify-end px-8 py-4 mt-8  ">
            <div className="flex flex-col gap-6  ">
                <div className="w-[326px] flex justify-center flex-col  gap-[22px] bg-[#1A1D1F] rounded-[8px] p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[18px] text-[#FCFCFC] font-semibold">Top kurslar</h3>
                        <div className="flex items-center gap-1">
                            <p className="text-[16px] text-[#9DA1A3]/40">Barchasi</p>
                            <img src="/icons/right-arrow.svg" alt="arrow" className="w-5 h-5"/>
                        </div>
                    </div>
                    <div className="flex flex-col divide-y divide-white/10">
                        <div className="pb-4">
                            <CourseItem image="/images/course1.png" title="Shaxmat donalari bilan tanishuv"/>
                        </div>
                        <div className="py-4">
                            <CourseItem image="/images/course2.png" title="Shoxga hujum qilish"/>
                        </div>
                        <div className="py-4">
                            <CourseItem image="/images/course3.png" title="Mot qilish"/>
                        </div>
                        <div className="pt-4">
                            <CourseItem image="/images/course4.png" title="Asosiy taktikalar"/>
                        </div>
                    </div>
                </div>
                <div className="w-[326px] flex justify-center flex-col  gap-[22px] bg-[#1A1D1F] rounded-[8px] p-4 overflow-hidden">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[18px] text-[#FCFCFC] font-semibold">Top kitoblar</h3>
                        <div className="flex items-center gap-1">
                            <p className="text-[16px] text-[#9DA1A3]/40">Barchasi</p>
                            <img src="/icons/right-arrow.svg" alt="arrow" className="w-5 h-5"/>
                        </div>
                    </div>
                    <div className=" flex flex-col divide-y divide-white/10">
                        <div className="pb-4">
                            <BooksItem image="/images/book1.png" title="Shaxmatdagi qobiliyatlaringizga qayta baxo bering"
                                       author="J.Silman"/>
                        </div>
                        <div className="py-4">
                            <BooksItem image="/images/book2.png" title="Mening tizimim" author="A.Nimzowitsch"/>
                        </div>
                        <div className="py-4 font-medium line-clamp-2">
                            <BooksItem image="/images/book3.png" title="Zurixdagi shaxmat musobaqasi" author="D.Bronstein"/>
                        </div>
                        <div className="pt-4">
                            <BooksItem image="/images/book4.png" title="Mening esdaqolarlik o'yinlarim" author="B.Fischer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}