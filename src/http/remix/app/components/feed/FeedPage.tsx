import React, { FC } from "react";
import { Article, PAGE_SIZE } from "../../lib/feed/article";
import useSWR from "swr";
import { fetcher } from "../../lib/data-fetch/client";
import ArticleSummary from "./ArticleSummary";
import FeedPageSkeleton from "./FeedPageSkeleton";

type FeedPageProps = {
  /**
   * page of articles to render
   */
  page: number;
  /**
   * The articles to render. If undefined, they will be fetched from the api.
   */
  articles?: Article[];
};

const FeedPage: FC<FeedPageProps> = function FeedPage({ page, articles }) {
  const { data } = useSWR(
    `/api/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`,
    fetcher,
    {
      initialData: articles && { articles },
    },
  );

  return data ? (
    data.articles.map((a: Article) => <ArticleSummary key={a.slug} article={a} />)
  ) : (
    <FeedPageSkeleton />
  );
};

export default FeedPage;
