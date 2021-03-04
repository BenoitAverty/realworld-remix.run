import { fetchWithApiUrl } from "../api-client";

export type Article = {
  slug: string;
  title: string;
  body: string;
  description: string;
  favoritesCount: number;
  createdAt: string;
  author: {
    image: string;
    username: string;
  };
};

const fetch = fetchWithApiUrl();
export async function getArticle(articleSlug: string): Promise<Article> {
  const response = await fetch(`/articles/${articleSlug}`);
  const body = await response.json();
  return body.article;
}
