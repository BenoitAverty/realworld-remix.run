import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import { FeedData } from "../../lib/feed/feed";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import ArticlesFeed from "../../components/feed/ArticlesFeed";
import { PAGE_SIZE } from "../../lib/feed/article";
import { AUTH_TOKEN_SESSION_KEY } from "../../lib/users/users";
import { json, Loader, redirect } from "@remix-run/data";
import { fetchWithToken } from "../../lib/api-client";
import { withSession } from "../../sessionStorage";

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

async function getUserFeed(page: number, apiAuthToken: string) {
  const fetch = fetchWithToken(apiAuthToken);

  const result = await fetch(`/articles/feed?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}

export const loader: Loader = async ({ request }) => {
  return withSession(request)(async session => {
    const apiAuthToken = session.get(AUTH_TOKEN_SESSION_KEY);

    if (!apiAuthToken) {
      // TODO manage callback to feed after login
      return redirect("/login");
    }

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
