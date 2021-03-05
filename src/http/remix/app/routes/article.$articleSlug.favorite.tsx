import { Action, Loader, redirect } from "@remix-run/data";
import { favoriteArticle } from "../lib/article/article";
import { AUTH_TOKEN_SESSION_KEY } from "../lib/users/users";
import { REFERER_QUERY_PARAM } from "../lib/utils";
import { withSession } from "../lib/request-utils";

// Remix doesn't support routes without a component yet,
// that's why we use noop (won't be rendered because the loader always redirects)
const Noop = function () {
  return null;
};
export default Noop;

export const loader: Loader = ({ request, params }) => {
  // People should not come here with a get request, but if they do, assume they want the article
  // itself (or the referer)
  const referer = new URL(request.url).searchParams.get(REFERER_QUERY_PARAM);
  return redirect(referer || `/article/${params.articleSlug}`);
};

export const action: Action = async function ({ params, request }) {
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

  return withSession(request)(async session => {
    const apiAuthToken = session.get(AUTH_TOKEN_SESSION_KEY);
    try {
      await favoriteArticle(params.articleSlug, apiAuthToken, favoriteAction);
    } catch (e) {
      console.error(e.message);
      // TODO handle error (show a popup ?)
    }
    return redirect(referer || `/article/${params.articleSlug}`);
  });
};
