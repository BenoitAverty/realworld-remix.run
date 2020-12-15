import React, { FC, useState } from "react";
import { Article } from "../../lib/feed/article";
import FeedPage from "./FeedPage";
import InfiniteScroll from "react-infinite-scroll-component";

type FeedProps = {
  totalPages: number;
  initialPage: number;
  initialData: Article[];
};

const Feed: FC<FeedProps> = function Feed({ totalPages, initialPage, initialData }) {
  // TODO currently this only works for the first page (the pages before are not rendered)
  // This is the usual use case because pagination occurs only when js is disabled, and then the infinite scroll does not work anyway.
  const [nPages, setNPages] = useState(1);
  const getNextPage = () => {
    setNPages(n => n + 1);
  };

  const pages = [];
  for (let i = initialPage; i < initialPage + nPages; i++) {
    pages.push(
      <FeedPage key={i} page={i} articles={i === initialPage ? initialData : undefined} />,
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

export default Feed;
