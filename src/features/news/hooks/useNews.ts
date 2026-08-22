import { useEffect, useRef, useState } from "react";
import { getNewsList } from "../../../api/news.api";
import { getApiErrorMessage } from "../../../lib/apiError";
import type { NewsArticle } from "../../../types/news.types";

const NEWS_PAGE_SIZE = 12;

export function useNews(search: string) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentPageRef = useRef(1);

  useEffect(() => {
    let isCancelled = false;
    currentPageRef.current = 1;

    async function loadFirstPage() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getNewsList({ page: 1, size: NEWS_PAGE_SIZE, search: search || undefined });
        if (isCancelled) return;
        setArticles(result.data);
        setHasNext(result.hasNext);
      } catch (err) {
        if (isCancelled) return;
        setError(getApiErrorMessage(err, "Yangiliklarni yuklashda xatolik yuz berdi."));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadFirstPage();
    return () => {
      isCancelled = true;
    };
  }, [search]);

  async function loadMore() {
    if (!hasNext || isLoadingMore) return;
    const nextPage = currentPageRef.current + 1;
    setIsLoadingMore(true);
    try {
      const result = await getNewsList({ page: nextPage, size: NEWS_PAGE_SIZE, search: search || undefined });
      currentPageRef.current = nextPage;
      setArticles((prev) => [...prev, ...result.data]);
      setHasNext(result.hasNext);
    } catch (err) {
      setError(getApiErrorMessage(err, "Ko'proq yangilik yuklashda xatolik yuz berdi."));
    } finally {
      setIsLoadingMore(false);
    }
  }

  return { articles, isLoading, isLoadingMore, error, hasNext, loadMore };
}