import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import type { LoaderFunction } from "remix";
import { json, useRouteData } from "remix";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData, getGlobalFeed, PAGE_SIZE } from "../../lib/feed/feed";
import { withAuthToken } from "../../lib/request-utils";

const GlobalFeed: FC = function GlobalFeed() {
  const data = useRouteData<FeedData>();

  // This uri is the uri to use when you wan to call a loader outside of a route navigation.
  // Remix will eventually provide a better way to do this, without having to know implementation details of remix.
  const pageLoadingUri = (page: number) => `/?_data=routes/index/index&page=${page}`;

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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  return await withAuthToken(request.headers.get("Cookie"))(async apiAuthToken => {
    try {
      const articles = await getGlobalFeed(page, apiAuthToken);
      return json({
        ...articles,
        page,
        totalPages: Math.ceil(articles.articlesCount / PAGE_SIZE),
      });
    } catch (error) {
      return json({ error }, 500);
    }
  });
};
