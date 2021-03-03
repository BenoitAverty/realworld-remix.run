import { Article } from "../article/article";

export type FeedData = {
  articles: Article[];
  articlesCount: number;
  page: number;
  totalPages: number;
};

export const PAGE_SIZE = 20;