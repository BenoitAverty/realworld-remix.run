import type { DataLoader } from "@remix-run/core";
import { fetchWithApiUrl } from "../../lib/api-client";
import { json } from "@remix-run/data";
import { PAGE_SIZE } from "../../lib/pagination";

async function getGlobalFeed(page: number) {
  const fetch = fetchWithApiUrl();

  const result = await fetch(`/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  return await result.json();
}

export const loader: DataLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const articles = await getGlobalFeed(page);

  return json({
    ...articles,
    page,
    totalPages: articles.articlesCount / PAGE_SIZE,
  });
};
