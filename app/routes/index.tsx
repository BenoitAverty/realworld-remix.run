import React from "react";
import { useRouteData } from "@remix-run/react";
import ArticleSummary from "../components/ArticleSummary";

export function meta() {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
}

export default function Index() {
  let data = useRouteData();


  return data.articles.map(a => <ArticleSummary article={a} />);
}
