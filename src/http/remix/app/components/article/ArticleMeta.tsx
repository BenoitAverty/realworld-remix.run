import { Link } from "@remix-run/react";
import FormattedDate from "../FormattedDate";
import React, { FC } from "react";
import ArticleFavoriteButton from "./ArticleFavoriteButton";

type ArticleMetaProps = {
  slug: string;
  author: {
    username: string;
    image: string;
  };
  favoritesCount: number;
  createdAt: string;
  isFavorite: boolean;
};

const ArticleMeta: FC<ArticleMetaProps> = function ArticleMeta({
  slug,
  author,
  createdAt,
  favoritesCount,
  isFavorite,
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
      <ArticleFavoriteButton articleSlug={slug} isFavorite={isFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"} Post{" "}
        <span className="counter">({favoritesCount})</span>
      </ArticleFavoriteButton>
    </div>
  );
};

export default ArticleMeta;
