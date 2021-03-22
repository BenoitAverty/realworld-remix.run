import { fetchWithApiUrl, fetchWithToken } from "../api-client.server";

export type Article = {
  slug: string;
  title: string;
  body: string;
  description: string;
  favoritesCount: number;
  favorited: boolean;
  createdAt: string;
  author: {
    image: string;
    username: string;
    following: boolean;
  };
};

export async function getArticle(
  articleSlug: string,
  token: string | null = null,
): Promise<Article | null> {
  const fetch = token ? fetchWithToken(token) : fetchWithApiUrl();
  const response = await fetch(`/articles/${articleSlug}`);
  if (response.status !== 200) {
    // TODO handle errors
    return null;
  }
  const body = await response.json();
  return body.article;
}

export async function favoriteArticle(
  articleSlug: string,
  apiAuthToken: string,
  action: "favorite" | "unfavorite",
): Promise<void> {
  const fetch = fetchWithToken(apiAuthToken);
  const response = await fetch(`/articles/${articleSlug}/favorite`, {
    method: action === "favorite" ? "post" : "delete",
  });

  if (response.status !== 200) {
    throw new Error(
      `could not ${action} the article : [${response.status}] ${await response.text()}`,
    );
  }
}
