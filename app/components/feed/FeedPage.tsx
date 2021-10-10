import React, { FC } from "react";
import { Article } from "../../lib/article/article";
import useSWR from "swr";
import { fetcher } from "../../lib/data-fetch/client";
import ArticleSummary from "./ArticleSummary";
import FeedPageSkeleton from "./FeedPageSkeleton";

type FeedPageProps = {
  /**
   * Uri of the page to render.
   */
  pageUri: string;
  /**
   * The articles to render. If undefined, they will be fetched from the api.
   */
  articles?: Article[];
};

const FeedPage: FC<FeedPageProps> = function FeedPage({ pageUri, articles }) {
  const { data } = useSWR(pageUri, fetcher, {
    fallbackData: articles && { articles },
  });

  return data ? (
    data.articles.map((a: Article) => <ArticleSummary key={a.slug} article={a} />)
  ) : (
    <FeedPageSkeleton />
  );
};

export default FeedPage;
