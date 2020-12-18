import type { DataLoader } from "@remix-run/core";
import { fetchWithApiUrl } from "../lib/api-client";
import { json } from "@remix-run/data";

async function getTags() {
  const fetch = fetchWithApiUrl();

  const result = await fetch("/tags");
  return result.json();
}

export const loader: DataLoader = async ({ request }) => {
  const tags = await getTags();

  return json(tags);
};
