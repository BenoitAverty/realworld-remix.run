import type { DataLoader } from "@remix-run/core";
import { fetchWithToken } from "../../lib/api-client";
import { json, redirect } from "@remix-run/data";
import { PAGE_SIZE } from "../../lib/pagination";
import { AUTH_TOKEN_SESSION_KEY } from "../../lib/users/users";

async function getUserFeed(page: number, apiAuthToken: string) {
  const fetch = fetchWithToken(apiAuthToken);

  const result = await fetch(`/articles/feed?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}

export const loader: DataLoader = async ({ request, session }) => {
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
};
