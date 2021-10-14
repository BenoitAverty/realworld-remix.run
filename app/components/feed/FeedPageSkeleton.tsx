import React, { FC } from "react";
import ArticleSummarySkeleton from "./ArticleSummarySkeleton";
import { PAGE_SIZE } from "../../lib/domain/feed/feed";

const FeedPageSkeleton: FC = function FeedPageSkeleton() {
  const skels = [];
  for (let i = 0; i < PAGE_SIZE; i++) {
    skels.push(<ArticleSummarySkeleton />);
  }

  return <>{skels}</>;
};

export default FeedPageSkeleton;
