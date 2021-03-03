import React, { FC } from "react";
import { Article } from "../../lib/article/article";
import ArticleMeta from "./ArticleMeta";
import Comments from "./Comments";

// TODO use children instead of a prop here.
const ArticleLayout: FC<{ article: Article }> = function ArticleLayout({ article }) {
  return (
    <div className="container page">
      <div className="row article-content">
        <div className="col-md-12">{article.body}</div>
      </div>

      <hr />

      <div className="article-actions">
        <ArticleMeta
          author={article.author}
          createdAt={article.createdAt}
          favoritesCount={article.favoritesCount}
        />
      </div>

      <Comments />
    </div>
  );
};

export default ArticleLayout;
