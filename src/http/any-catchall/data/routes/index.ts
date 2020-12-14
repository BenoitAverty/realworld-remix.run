import type { DataLoader } from "@remix-run/core";
import { apiUrl } from "../lib/api-client";

export const loader: DataLoader = async () => {
  return fetch(apiUrl + "/articles");
};
