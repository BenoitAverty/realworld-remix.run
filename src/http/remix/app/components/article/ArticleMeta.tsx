import { Link } from "@remix-run/react";
import FormattedDate from "../FormattedDate";
import React, { FC } from "react";

type ArticleMetaProps = {
  author: {
    username: string;
    image: string;
  };
  favoritesCount: number;
  createdAt: string;
};

const ArticleMeta: FC<ArticleMetaProps> = function ArticleMeta({
  author,
  createdAt,
  favoritesCount,
}) {
  return (
    <div className="article-meta">
      <Link to={`/@${author.username}`}>
        <img src={author.image} />
      </Link>
      <div className="info">
        <Link to={`/@${author.username}`} className="author">
          {author.username}
        </Link>
        <FormattedDate date={createdAt} />
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; Follow {author.username}
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart" />
        &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
      </button>
    </div>
  );
};

export default ArticleMeta;
