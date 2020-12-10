import React from "react";
import { useRouteData } from "@remix-run/react";
import ArticleSummary from "../components/ArticleSummary";
import {Article} from "../lib/articles/article";

export function meta() {
  return {
    title: "Home — Conduit",
    description: "A place to share your knowledge."
  };
}

export default function Index() {
  let data = useRouteData();


  return data.articles.map((a: Article) => <ArticleSummary key={a.slug} article={a} />);
}
