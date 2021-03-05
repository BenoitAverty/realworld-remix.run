import React, { FC } from "react";
import { Article } from "../../lib/article/article";
import { Link } from "@remix-run/react";
import ArticleFavoriteButton from "../article/ArticleFavoriteButton";

type ArticleSummaryProps = {
  article: Article;
};

const ArticleSummary: FC<ArticleSummaryProps> = function ArticleSummary({ article }) {
  return (
    <div data-testid="article-summary" className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <div className={"pull-xs-right"}>
          <ArticleFavoriteButton isFavorite={article.favorited} articleSlug={article.slug}>
            <i className={article.favorited ? "ion-heart-broken" : "ion-heart"} />{" "}
            {/* TODO: On the homepage, clicking this button updates the icon but not the count (need to refresh). Why ? */}
            {article.favoritesCount}
          </ArticleFavoriteButton>
        </div>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticleSummary;
