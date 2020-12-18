import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import { FeedData } from "../../lib/feed/feed";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import ArticlesFeed from "../../components/feed/ArticlesFeed";
import { PAGE_SIZE } from "../../lib/feed/article";

const Feed: FC = function Feed() {
  const data = useRouteData<FeedData>();

  const pageLoadingUri = (page: number) =>
    `/api/articles/feed?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`;

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

export default Feed;
