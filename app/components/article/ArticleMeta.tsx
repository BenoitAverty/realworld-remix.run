import { Link } from "remix";
import FormattedDate from "../FormattedDate";
import React, { FC } from "react";
import ArticleFavoriteButton from "./ArticleFavoriteButton";
import FollowUserButton from "../user/FollowUserButton";

type ArticleMetaProps = {
  slug: string;
  author: {
    username: string;
    image: string;
    following: boolean;
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
      <FollowUserButton username={author.username} isFollowing={author.following} />
      &nbsp;&nbsp;
      <ArticleFavoriteButton
        articleSlug={slug}
        favoritesCount={favoritesCount}
        isFavorite={isFavorite}
        full
      />
    </div>
  );
};

export default ArticleMeta;
