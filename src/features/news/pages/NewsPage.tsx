import { useState } from "react";
import { Layout } from "../../common/components/Layout.tsx";
import { NewsItem } from "../components/NewsItem.tsx";
import { BooksItem } from "../components/BooksItem.tsx";
import { useNews } from "../hooks/useNews.ts";
import { useDebouncedSearch } from "../../../lib/seDebouncedSearch.ts";
import {YoungPortal} from "../../common/components/YoungPortal.tsx";

export function NewsPage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedSearch(searchInput, 400);

  const { articles, isLoading, isLoadingMore, error, hasNext, loadMore } = useNews(debouncedSearch);

  return <Layout>
    <div className="px-8 py-4 mt-8 mx-auto" >
      <div className="flex gap-130  w-[1036] h-[52px]  mb-6">
        <h1 className="text-[32px] font-bold text-[#F7F9FA]">Yangiliklar</h1>
        <div className="flex">
          <img src="/icons/weakSearch.svg" alt="search" className="relative left-8 top-1/2 -translate-y-1/2 w-6 h-6"/>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Izlash"
            className="w-[326px] h-[52] pl-10 pr-4 rounded-lg bg-[#15181A] text-white outline-none"/>
        </div>

      </div>
      <div className="flex items-start gap-6">
        <div className="w-[1026px]">
          {isLoading ? (
            <p className="text-[#8B8E91] py-10">Yuklanmoqda...</p>
          ) : error ? (
            <p className="text-[#8B8E91] py-10">{error}</p>
          ) : articles.length === 0 ? (
            <p className="text-[#8B8E91] py-10">Hech qanday yangilik topilmadi</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-[20px]">
                {articles.map((article) => (
                  <NewsItem key={article.id} image={article.image} title={article.title} date={article.date} content={article.content} />
                ))}
              </div>

              {hasNext && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={isLoadingMore}
                    className="px-8 h-10 bg-[#292B2E] rounded-lg text-[14px] hover:bg-[#33363A] transition disabled:opacity-50"
                  >
                    {isLoadingMore ? "..." : "Ko'proq"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
  <div className="w-[326px] flex-shrink-0 flex flex-col gap-6">
    <YoungPortal />
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
    </div>
  </Layout>
}