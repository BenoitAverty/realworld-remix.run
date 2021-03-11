import { Action, Loader, redirect } from "@remix-run/data";
import { REFERER_QUERY_PARAM } from "../lib/utils";
import { requireAuthenticatedUsed } from "../lib/request-utils";
import { followUser } from "../lib/users/profile";

// Remix doesn't support routes without a component yet,
// that's why we use noop (won't be rendered because the loader always redirects)
const Noop = function () {
  return null;
};
export default Noop;

export const loader: Loader = ({ request, params }) => {
  // People should not come here with a get request, but if they do, assume they want the profile
  // itself (or the referer)
  const referer = new URL(request.url).searchParams.get(REFERER_QUERY_PARAM);
  return redirect(referer || `/profile/${params.username}`);
};

export const action: Action = async function ({ params, request, context }) {
  const referer = new URL(request.url).searchParams.get(REFERER_QUERY_PARAM);

  const requestBody = new URLSearchParams(await request.text());
  if (
    requestBody.get("followAction") !== "follow" &&
    requestBody.get("followAction") !== "unfollow"
  ) {
    // TODO handle error
    return redirect(referer || `/profile/${params.username}`);
  }
  const followAction = requestBody.get("followAction") as "follow" | "unfollow";

  return requireAuthenticatedUsed(context.arcRequest)(async apiAuthToken => {
    try {
      await followUser(params.username, apiAuthToken, followAction);
    } catch (e) {
      console.error(e.message);
      // TODO handle error (show a popup ?)
    }
    return redirect(referer || `/profile/${params.username}`);
  });
};
