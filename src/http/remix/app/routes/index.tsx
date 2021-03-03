import React from "react";
import { useRouteData } from "@remix-run/react";
import Banner from "../components/layout/Banner";
import TagList from "../components/tags/TagList";
import Tag from "../components/tags/Tag";
import FeedToggle from "../components/feed/FeedToggle";
import FeedLayout from "../components/feed/FeedLayout";
import { Outlet } from "react-router-dom";

import type { Loader } from "@remix-run/data";
import { json } from "@remix-run/data";
import { fetchWithApiUrl } from "../lib/api-client";


export function meta() {
  return {
    title: "Home — Conduit",
    description: "A place to share your knowledge.",
  };
}

type IndexData = {
  tags: string[];
};

const Index = function Index() {
  const data = useRouteData<IndexData>();

  return (
    <div className="home-page">
      <Banner>
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </Banner>

      <FeedLayout
        feed={
          <>
            <FeedToggle />
            {/* <FeedToggle tag="javascript" /> */}

            <Outlet />
          </>
        }
        tags={
          <>
            <p>Popular Tags</p>

            <TagList>
              {data.tags.map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </TagList>
          </>
        }
      />
    </div>
  );
};

export default Index;

async function getTags() {
  const fetch = fetchWithApiUrl();

  const result = await fetch("/tags");
  return result.json();
}

export const loader: Loader = async () => {
  const tags = await getTags();

  return json(tags);
};
