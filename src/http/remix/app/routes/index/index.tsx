import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData } from "../../lib/feed/feed";
import { PAGE_SIZE } from "../../lib/feed/article";

const GlobalFeed: FC = function GlobalFeed() {
  const data = useRouteData<FeedData>();

  const pageLoadingUri = (page: number) =>
    `/api/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`;

  return (
    <>
      <ArticlesFeed
        pageLoadingUri={pageLoadingUri}
        initialPage={data.page}
        initialData={data.articles}
        totalPages={data.totalPages}
      />

      <HideAfterFirstRender>
        <Pagination page={data.page} totalPages={data.totalPages} />
      </HideAfterFirstRender>
    </>
  );
};

export default GlobalFeed;
