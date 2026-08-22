import { apiClient } from "./axios";
import type { PaginatedResult } from "../types/pagination.types";
import type { NewsArticle, NewsArticleDetail, NewsListParams } from "../types/news.types";


export async function getNewsList(params: NewsListParams) {
  const { data } = await apiClient.get<PaginatedResult<NewsArticle>>("/news/list", { params });
  return data;
}

export async function getNewsArticle(id: number) {
  const { data } = await apiClient.get<NewsArticleDetail>(`/news/${id}`);
  return data;
}