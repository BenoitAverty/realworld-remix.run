import React, { FC, ReactNode } from "react";

type FeedLayoutProps = {
  feed: ReactNode;
  tags: ReactNode;
};

const FeedLayout: FC<FeedLayoutProps> = function FeedLayout({ feed, tags }) {
  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-9">{feed}</div>

        <div className="col-md-3">
          <div className="sidebar">{tags}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
