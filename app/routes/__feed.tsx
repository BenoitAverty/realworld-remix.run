import React from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import Banner from "../components/layout/Banner";
import TagList from "../components/tags/TagList";
import Tag from "../components/tags/Tag";
import FeedToggle from "../components/feed/FeedToggle";
import FeedLayout from "../components/feed/FeedLayout";
import { Outlet } from "react-router-dom";
import { fetchWithApiUrl } from "../lib/api-client.server";

export function meta() {
  return {
    title: "Home — Conduit",
    description: "A place to share your knowledge.",
  };
}

type IndexData = {
  tags: string[];
};

const __feed = function Index() {
  const data = useLoaderData<IndexData>();

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

export default __feed;

export const loader: LoaderFunction = async () => {
  const fetch = fetchWithApiUrl();

  try {
    const result = await fetch("/tags");

    if (result.status === 200) {
      return json(await result.json());
    } else {
      return json({ error: await result.text() }, 500);
    }
  } catch (error) {
    return json(error, 500);
  }
};
