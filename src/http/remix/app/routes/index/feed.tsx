import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import { FeedData, getUserFeed, PAGE_SIZE } from "../../lib/feed/feed";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import ArticlesFeed from "../../components/feed/ArticlesFeed";
import { json, Loader } from "@remix-run/data";
import { requireAuthenticatedUsed } from "../../lib/request-utils";

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

export const loader: Loader = async ({ request, context }) => {
  return requireAuthenticatedUsed(context.arcRequest)(async apiAuthToken => {
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get("page") || "1");
    const articles = await getUserFeed(page, apiAuthToken);

    return json({
      ...articles,
      page,
      totalPages: articles.articlesCount / PAGE_SIZE,
    });
  });
};
