import type { DataLoader } from "@remix-run/core";
import { fetchWithApiUrl } from "../lib/api-client";
import { json } from "@remix-run/data";
import { PAGE_SIZE } from "../lib/pagination";

export const loader: DataLoader = async ({ request }) => {
  const fetch = fetchWithApiUrl();

  // @ts-ignore
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");

  const result = await fetch(`/articles?offset=${PAGE_SIZE * (page - 1)}&limit=${PAGE_SIZE}`);
  const body = await result.json();

  return json({
    ...body,
    page,
    totalPages: body.articlesCount / PAGE_SIZE,
  });
};
