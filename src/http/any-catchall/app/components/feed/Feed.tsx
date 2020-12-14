import React, { FC, useState } from "react";
import { Article } from "../../lib/feed/article";
import FeedPage from "./FeedPage";
import InfiniteScroll from "react-infinite-scroll-component";

type FeedProps = {
  articlesCount: number;
  totalPages: number;
  initialPage: number;
  initialData: Article[];
};

const Feed: FC<FeedProps> = function Feed({ articlesCount, totalPages, initialPage, initialData }) {
  const [nPages, setNPages] = useState(1);
  const getNextPage = () => {
    console.log("tchou")
    setNPages(n => n + 1);
  };

  const pages = [];
  for (let i = 1; i <= nPages; i++) {
    pages.push(
      <FeedPage key={i} page={i} articles={i === initialPage ? initialData : undefined} />,
    );
  }

  return (
    <InfiniteScroll
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
