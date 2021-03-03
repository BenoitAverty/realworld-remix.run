import React, { FC } from "react";
import { json, Loader } from "@remix-run/data";
import Banner from "../components/layout/Banner";
import { useRouteData, Link } from "@remix-run/react";
import { Article, getArticle } from "../lib/article/article";
import ArticleLayout from "../components/article/ArticleLayout";
import FormattedDate from "../components/FormattedDate";
import ArticleMeta from "../components/article/ArticleMeta";

type ArticleData = {
  article: Article;
};

const ArticleDetails: FC = function ArticleDetails() {
  const { article } = useRouteData<ArticleData>();

  return (
    <div className="article-page">
      <Banner>
        <h1>{article.title}</h1>

        <ArticleMeta
          author={article.author}
          favoritesCount={article.favoritesCount}
          createdAt={article.createdAt}
        />
      </Banner>

      <ArticleLayout article={article} />
    </div>
  );
};

export default ArticleDetails;

export const loader: Loader = async function ({ params }) {
  const article = await getArticle(params.articleSlug);
  return json({ article });
};
