export interface PaginatedResult<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: T[];
}

export interface PageQueryParams {
  page?: number;
  size?: number;
}