import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import { Loader, useRouteData } from "@remix-run/react";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData, getGlobalFeed, PAGE_SIZE } from "../../lib/feed/feed";
import { json } from "@remix-run/node";
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

export const loader: Loader = async ({ request, context }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  return await withAuthToken(context.arcRequest)(async apiAuthToken => {
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
