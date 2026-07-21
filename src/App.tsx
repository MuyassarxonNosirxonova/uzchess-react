import {NewsItem} from "./features/news/components/NewsItem.tsx";
import {BooksItem} from "./features/news/components/BooksItem.tsx";

export default function App() {
    return (
        <div className="flex">
            <div className="w-[1026px] grid grid-cols-3 gap-[24px]">
                <NewsItem image="/images/news1.png" title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news3.png" title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..." text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news4.png" title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news4.png" title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news2.png" title="Xalqaro shaxmat musobaqalari g‘oliblariga nima beriladi?" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news5.png" title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news3.png" title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..." text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news6.png" title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news4.png" title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news2.png" title="Xalqaro shaxmat musobaqalari g‘oliblariga nima beriladi?" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news3.png" title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..." text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
                <NewsItem image="/images/news1.png" title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi" text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita g‘...."/>
            </div>
            <div className="flex justify-center flex-col  gap-[22px] bg-[#1A1D1F] rounded-[8px] p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[18px] text-[#FCFCFC] font-semibold">Top kitoblar</h3>
                    <div className="flex items-center gap-1">
                        <p className="text-[16px] text-[#9DA1A3]/40">Barchasi</p>
                        <img src="/icons/right-arrow.svg" alt="arrow" className="w-5 h-5"/>
                    </div>
                </div>

                <BooksItem image="/images/book1.png" title="Shaxmatdagi qobiliyatliringizga qayta baxo bering"
                           author="J.Silman"/>
                <BooksItem image="/images/book2.png" title="Mening tizimim" author="A.Nimzowitsch"/>
                <BooksItem image="/images/book3.png" title="Zurixdagi shaxmat musobaqasi" author="D.Bronstein"/>
                <BooksItem image="/images/book4.png" title="Mening esdaqolarlik o'yinlarim" author="B.Fischer"/>
            </div>
        </div>
    )
}