import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData, getGlobalFeed, PAGE_SIZE } from "../../lib/feed/feed";
import { json, Loader } from "@remix-run/data";
import { withAuthToken } from "../../lib/request-utils";

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

export const loader: Loader = async ({ request, context }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  return await withAuthToken(context.arcRequest)(async apiAuthToken => {
    const articles = await getGlobalFeed(page, apiAuthToken);
    return json({
      ...articles,
      page,
      totalPages: articles.articlesCount / PAGE_SIZE,
    });
  });
};
