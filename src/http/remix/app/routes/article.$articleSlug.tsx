import React, { FC } from "react";
import { json, Loader } from "@remix-run/data";
import Banner from "../components/layout/Banner";
import { useRouteData } from "@remix-run/react";
import { Article, getArticle } from "../lib/article/article";
import ArticleLayout from "../components/article/ArticleLayout";
import ArticleMeta from "../components/article/ArticleMeta";
import Comments from "../components/article/Comments";

type ArticleData = {
  article: Article;
};

const ArticleDetails: FC = function ArticleDetails() {
  const { article } = useRouteData<ArticleData>();

  const articleMeta = (
    <ArticleMeta
      author={article.author}
      favoritesCount={article.favoritesCount}
      createdAt={article.createdAt}
    />
  );

  return (
    <div className="article-page">
      <Banner>
        <h1>{article.title}</h1>

        {articleMeta}
      </Banner>

      <ArticleLayout
        actions={
          <ArticleMeta
            author={article.author}
            createdAt={article.createdAt}
            favoritesCount={article.favoritesCount}
          />
        }
        comments={<Comments />}
        body={article.body}
      />
    </div>
  );
};

export default ArticleDetails;

export const loader: Loader = async function ({ params }) {
  const article = await getArticle(params.articleSlug);
  return json({ article });
};
