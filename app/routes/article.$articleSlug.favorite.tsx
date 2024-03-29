import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { favoriteArticle } from "../lib/domain/article/article";
import { REFERER_QUERY_PARAM } from "../lib/domain/utils";
import { requireAuthenticatedUser } from "../lib/loaders-actions/auth-utils";

// Remix doesn't support routes without a component yet,
// that's why we use noop (won't be rendered because the loader always redirects)
const Noop = function () {
  return null;
};
export default Noop;

export const loader: LoaderFunction = ({ request, params }) => {
  // People should not come here with a get request, but if they do, assume they want the article
  // itself (or the referer)
  const referer = new URL(request.url).searchParams.get(REFERER_QUERY_PARAM);
  return redirect(referer || `/article/${params.articleSlug}`);
};

export const action: ActionFunction = async function ({ params, request }) {
  const referer = new URL(request.url).searchParams.get(REFERER_QUERY_PARAM);

  const requestBody = new URLSearchParams(await request.text());
  if (
    requestBody.get("favoriteAction") !== "favorite" &&
    requestBody.get("favoriteAction") !== "unfavorite"
  ) {
    // TODO handle error
    return redirect(referer || `/article/${params.articleSlug}`);
  }
  const favoriteAction = requestBody.get("favoriteAction") as "favorite" | "unfavorite";

  const { token } = await requireAuthenticatedUser(request);
  try {
    await favoriteArticle(params.articleSlug as string, token, favoriteAction);
  } catch (e: any) {
    console.error(e.message);
    // TODO handle error (show a popup ?)
  }
  return redirect(referer || `/article/${params.articleSlug}`);
};
