import React, { FC } from "react";
import { PAGE_SIZE } from "../../lib/feed/article";
import ArticleSummarySkeleton from "./ArticleSummarySkeleton";

const FeedPageSkeleton: FC = function FeedPageSkeleton() {
  const skels = [];
  for (let i = 0; i < PAGE_SIZE; i++) {
    skels.push(<ArticleSummarySkeleton />);
  }

  return <>{skels}</>;
};

export default FeedPageSkeleton;
