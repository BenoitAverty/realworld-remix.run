import React, { FC } from "react";
import { Article } from "../../lib/feed/article";
import useSWR from "swr";
import { PAGE_SIZE } from "../../../common/lib/pagination";
import { fetcher } from "../../lib/data-fetch/client";
import ArticleSummary from "./ArticleSummary";

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
    `/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`,
    fetcher,
    {
      initialData: articles && { articles },
    },
  );

  return data ? (
    data.articles.map((a: Article) => <ArticleSummary key={a.slug} article={a} />)
  ) : (
    // TODO replace with a skeleton for more beautiful but still use space.
    // If this doesn't use space, the infinite scroll component loads many pages at once
    <div style={{ height: "600px" }}>Fetching more articles...</div>
  );
};

export default FeedPage;
