export interface NewsArticle {
  id: number;
  title: string;
  image: string;
  date: string;
  content?: string;
}

export interface NewsArticleDetail extends NewsArticle {
  content: string;
}
export interface NewsListParams {
  search?: string;
  page?: number;
  size?: number;
}