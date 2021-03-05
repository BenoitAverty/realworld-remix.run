import { Form, Link } from "@remix-run/react";
import FormattedDate from "../FormattedDate";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { REFERER_QUERY_PARAM } from "../../lib/utils";

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
  const { pathname, search, hash } = useLocation();
  const currentPage = pathname + search + hash;

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
      <Form
        action={`/article/${slug}/favorite?${REFERER_QUERY_PARAM}=${currentPage}`}
        method="post"
        style={{ display: "inline" }}
      >
        <input
          type="hidden"
          name={"favoriteAction"}
          value={isFavorite ? "unfavorite" : "favorite"}
        />
        <button type="submit" className="btn btn-sm btn-outline-primary">
          <i className="ion-heart" />
          &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
        </button>
      </Form>
    </div>
  );
};

export default ArticleMeta;
