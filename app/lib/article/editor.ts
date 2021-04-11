import { fetchWithToken } from "../api-client.server";
import { Article } from "./article";

export type EditorFormErrors = {
  errors: {
    title?: string[];
    description?: string[];
    body?: string[];
    tagList?: string[];
    global?: string[];
  };
};

export type ArticleResult = {
  article: Article;
};

export async function createArticle(
  apiAuthToken: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
): Promise<ArticleResult | EditorFormErrors> {
  const fetch = fetchWithToken(apiAuthToken);

  const result = await fetch("/articles", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });

  if (result.status === 422) {
    return (await result.json()) as EditorFormErrors;
  } else if (result.status >= 200 && result.status < 300) {
    return (await result.json()) as ArticleResult; // TODO the article
  } else {
    throw new Error(await result.text()); // TODO other errors
  }
}

export function isError(result: ArticleResult | EditorFormErrors): result is EditorFormErrors {
  return (result as EditorFormErrors).errors !== undefined;
}
