import React, { FC } from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import { FeedData, getUserFeed, PAGE_SIZE } from "../../lib/domain/feed/feed";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import ArticlesFeed from "../../components/feed/ArticlesFeed";
import { requireAuthenticatedUser } from "../../lib/loaders-actions/auth-utils";

const Feed: FC = function Feed() {
  const data = useLoaderData<FeedData>();

  // This uri is the uri to use when you wan to call a loader outside of a route navigation.
  // Remix will eventually provide a better way to do this, without having to know implementation details of remix.
  const pageLoadingUri = (page: number) => `/feed?_data=routes/__feed/feed&page=${page}`;

  return (
    <div className="user-feed">
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

export default Feed;

export const loader: LoaderFunction = async ({ request }) => {
  const { token } = await requireAuthenticatedUser(request);
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const articles = await getUserFeed(page, token);

  return json({
    ...articles,
    page,
    totalPages: articles.articlesCount / PAGE_SIZE,
  });
};
