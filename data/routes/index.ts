import type {DataLoader} from "@remix-run/core";
import {apiUrl} from "../lib/api-client";

export let loader: DataLoader = async () => {
  return fetch(apiUrl + "/articles")
};
