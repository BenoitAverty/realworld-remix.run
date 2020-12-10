import type { DataLoader } from "@remix-run/core";

export let loader: DataLoader = async () => {
  return fetch("https://conduit.productionready.io/api/articles")
};
