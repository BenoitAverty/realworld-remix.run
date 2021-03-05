import ArticlesFeed from "../../components/feed/ArticlesFeed";
import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import HideAfterFirstRender from "../../components/HideAfterFirstRender";
import Pagination from "../../components/feed/Pagination";
import { FeedData, PAGE_SIZE } from "../../lib/feed/feed";
import { json, Loader } from "@remix-run/data";
import { fetchWithApiUrl, fetchWithToken } from "../../lib/api-client";
import { withSession } from "../../sessionStorage";
import { AUTH_TOKEN_SESSION_KEY } from "../../lib/users/users";

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

async function getGlobalFeed(page: number, token: string | null) {
  const fetch = token ? fetchWithToken(token) : fetchWithApiUrl();

  const result = await fetch(`/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}

export const loader: Loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  // TODO make a `withToken` function.
  return await withSession(request)(async session => {
    const articles = await getGlobalFeed(page, session.get(AUTH_TOKEN_SESSION_KEY) || null);
    return json({
      ...articles,
      page,
      totalPages: articles.articlesCount / PAGE_SIZE,
    });
  });
};
