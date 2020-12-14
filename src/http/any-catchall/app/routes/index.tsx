import React from "react";
import { useRouteData } from "@remix-run/react";
import ArticleSummary from "../components/ArticleSummary";
import { Article } from "../lib/articles/article";
import Banner from "../components/layout/Banner";
import TagList from "../components/tags/TagList";
import Tag from "../components/tags/Tag";
import FeedToggle from "../components/feed/FeedToggle";
import FeedLayout from "../components/feed/FeedLayout";

export function meta() {
  return {
    title: "Home — Conduit",
    description: "A place to share your knowledge.",
  };
}

const Index = function Index() {
  const data = useRouteData();

  const articles = data.articles.map((a: Article) => <ArticleSummary key={a.slug} article={a} />);

  return (
    <div className="home-page">
      <Banner>
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </Banner>

      <FeedLayout
        feed={
          <>
            <FeedToggle tag="javascript" />

            {articles}
          </>
        }
        tags={
          <>
            <p>Popular Tags</p>

            <TagList>
              <Tag>programming</Tag>
              <Tag>javascript</Tag>
              <Tag>emberjs</Tag>
              <Tag>angularjs</Tag>
              <Tag>react</Tag>
              <Tag>mean</Tag>
              <Tag>node</Tag>
              <Tag>rails</Tag>
            </TagList>
          </>
        }
      />
    </div>
  );
};

export default Index;
