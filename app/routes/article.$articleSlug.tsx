import React, { FC } from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import Banner from "../components/layout/Banner";
import { Article, getArticle } from "../lib/article/article";
import ArticleLayout from "../components/article/ArticleLayout";
import ArticleMeta from "../components/article/ArticleMeta";
import Comments from "../components/article/Comments";
import { withAuthToken } from "../lib/request-utils";
import Layout404 from "../components/layout/404";

type ArticleData = {
  article: Article | null;
};

const ArticleDetails: FC = function ArticleDetails() {
  const { article } = useLoaderData<ArticleData>();

  if (!article) {
    return (
      <Layout404
        backlinkText={"Back to the feed"}
        backlinkTo={"/"}
        title="Cet article n'existe pas"
      />
    );
  }
  const articleMeta = (
    <ArticleMeta
      isFavorite={article.favorited}
      slug={article.slug}
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

      <ArticleLayout actions={articleMeta} comments={<Comments />} body={article.body} />
    </div>
  );
};

export default ArticleDetails;

export const loader: LoaderFunction = async function ({ params, request }) {
  return withAuthToken(request.headers.get("Cookie"))(async apiAuthToken => {
    const article = await getArticle(params.articleSlug as string, apiAuthToken);
    if (article === null) {
      return new Response(null, { status: 404 });
    }
    return json({ article });
  });
};
