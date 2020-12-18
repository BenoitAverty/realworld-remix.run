import { Article } from "./article";

export type FeedData = {
  articles: Article[];
  articlesCount: number;
  page: number;
  totalPages: number;
};