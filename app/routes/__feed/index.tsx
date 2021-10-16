import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData, getGlobalFeed, PAGE_SIZE } from "../../lib/domain/feed/feed";
import { getAuthenticatedUser } from "../../lib/loaders-actions/auth-utils";

const GlobalFeed: FC = function GlobalFeed() {
  const data = useLoaderData<FeedData>();

  // This uri is the uri to use when you wan to call a loader outside of a route navigation.
  // Remix will eventually provide a better way to do this, without having to know implementation details of remix.
  const pageLoadingUri = (page: number) => `/?_data=routes/__feed/index&page=${page}`;

  return (
    <div className="global-feed">
      <ArticlesFeed
        pageLoadingUri={pageLoadingUri}
        initialPage={data.page}
        initialData={data.articles}
        totalPages={data.totalPages}
      />

      <HideAfterFirstRender>
        <Pagination page={data.page} totalPages={data.totalPages} />
      </HideAfterFirstRender>
    </div>
  );
};

export default GlobalFeed;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  const user = await getAuthenticatedUser(request);
  const apiAuthToken = user && user.token;
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
};
