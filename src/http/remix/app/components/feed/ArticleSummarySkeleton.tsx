import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const ArticleSummarySkeleton: FC = function ArticleSummarySkeleton() {
  return (
    <div data-testid="article-summary" className="article-preview">
      <div className="article-meta">
        {/* blank img ! */}
        <Skeleton circle={true} width={32} height={32} />
        <div className="info">
          <Skeleton width={100} height={15} />
          <span className="date">
            <Skeleton width={300} />
          </span>
        </div>
      </div>
      <a href="" className="preview-link">
        <h1>
          <Skeleton height={20} />
        </h1>
        <p>
          <Skeleton count={3} />
        </p>
      </a>
    </div>
  );
};

export default ArticleSummarySkeleton;
