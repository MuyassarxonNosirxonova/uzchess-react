import { Layout } from "../../common/components/Layout.tsx";
import { NewsItem } from "../components/NewsItem.tsx";
import { BooksItem } from "../components/BooksItem.tsx";
import { useState } from "react";
import { useDebouncedSearch } from "../../../lib/seDebouncedSearch.ts";

export function NewsPage() {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebouncedSearch(searchInput, 400);

  return (
    <Layout>
      <div className="px-8 py-4 mt-8 mx-auto">

        {/* Header */}
        <div className="flex justify-between w-[1036px] h-[52px] mb-6">

          <h1 className="text-[32px] font-bold text-[#F7F9FA]">
            Yangiliklar
          </h1>

          {/* Search */}
          <div className="relative">
            <img
              src="/icons/weakSearch.svg"
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6"
            />

            <input
              type="text"
              placeholder="Izlash"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-[326px] h-[52px] pl-10 pr-4 rounded-lg bg-[#15181A] text-white outline-none"
            />
          </div>

        </div>

        {/* Content */}
        <div className="flex items-start gap-6">

          {/* News */}
          <div className="w-[1026px] grid grid-cols-3 gap-[20px]">

            <NewsItem
              image="/images/news1.png"
              title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news3.png"
              title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..."
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news4.png"
              title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news4.png"
              title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news2.png"
              title="Xalqaro shaxmat musobaqalari g‘oliblariga nima beriladi?"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news5.png"
              title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news3.png"
              title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..."
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news6.png"
              title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news4.png"
              title="O‘zbekiston shaxmatchilari olimpiadada Armanistonlik raqiblarini mag‘lub etishdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news2.png"
              title="Xalqaro shaxmat musobaqalari g‘oliblariga nima beriladi?"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news3.png"
              title="“Qo‘shnilarning buyuk jasorati”: Rossiyalik grossmeyster o‘zbek shaxmatining g‘alab..."
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

            <NewsItem
              image="/images/news1.png"
              title="Nodirbek Abdusattorov FIDE jonli reytingida 2700 balldan o‘tdi"
              text="O‘zbekistonlik yosh grossmeyster Turkiyada o‘tkazilgan shaxmat olimpiadasida ikkita...."
            />

          </div>

          {/* Top books */}
          <div className="w-[326px] flex justify-center flex-col gap-[22px] bg-[#1A1D1F] rounded-[8px] p-4 overflow-hidden">

            <div className="flex justify-between items-center">

              <h3 className="text-[18px] text-[#FCFCFC] font-semibold">
                Top kitoblar
              </h3>

              <div className="flex items-center gap-1">
                <p className="text-[16px] text-[#9DA1A3]/40 cursor-pointer">
                  Barchasi
                </p>

                <img
                  src="/icons/right-arrow.svg"
                  alt="arrow"
                  className="w-5 h-5"
                />
              </div>

            </div>

            <div className="flex flex-col divide-y divide-white/10">

              <div className="pb-4">
                <BooksItem
                  image="/images/book1.png"
                  title="Shaxmatdagi qobiliyatlaringizga qayta baxo bering"
                  author="J.Silman"
                />
              </div>

              <div className="py-4">
                <BooksItem
                  image="/images/book2.png"
                  title="Mening tizimim"
                  author="A.Nimzowitsch"
                />
              </div>

              <div className="py-4">
                <BooksItem
                  image="/images/book3.png"
                  title="Zurixdagi shaxmat musobaqasi"
                  author="D.Bronstein"
                />
              </div>

              <div className="pt-4">
                <BooksItem
                  image="/images/book4.png"
                  title="Mening esda qolarli o‘yinlarim"
                  author="B.Fischer"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}