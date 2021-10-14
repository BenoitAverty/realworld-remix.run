import React, { FC, useState } from "react";
import { Article } from "../../lib/domain/article/article";
import FeedPage from "./FeedPage";
import InfiniteScroll from "react-infinite-scroll-component";

type ArticlesFeedProps = {
  pageLoadingUri: (page: number) => string;
  totalPages: number;
  initialPage: number;
  initialData: Article[];
};

const ArticlesFeed: FC<ArticlesFeedProps> = function ArticlesFeed({
  pageLoadingUri,
  totalPages,
  initialPage,
  initialData,
}) {
  // TODO currently this only works for the first page (the pages before are not rendered)
  // This is the usual use case because pagination occurs only when js is disabled, and then the infinite scroll does not work anyway.
  const [nPages, setNPages] = useState(1);
  const getNextPage = () => {
    setNPages(n => n + 1);
  };

  if (totalPages === 0) {
    return <p>There's nothing to see here !</p>;
  }

  const pages = [];
  for (let i = initialPage; i < initialPage + nPages; i++) {
    pages.push(
      <FeedPage
        key={i}
        pageUri={pageLoadingUri(i)}
        articles={i === initialPage ? initialData : undefined}
      />,
    );
  }

  return (
    <InfiniteScroll
      style={{ overflow: "inherit" }}
      dataLength={pages.length}
      next={getNextPage}
      scrollThreshold={"100px"}
      hasMore={nPages !== totalPages}
      loader={null}
      endMessage={"You've read everything !"}
    >
      {pages}
    </InfiniteScroll>
  );
};

export default ArticlesFeed;
