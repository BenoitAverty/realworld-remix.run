import { fetchWithToken } from "../api-client";

export async function followUser(
  username: string,
  apiAuthToken: string,
  action: "follow" | "unfollow",
): Promise<void> {
  const fetch = fetchWithToken(apiAuthToken);
  const response = await fetch(`/profiles/${username}/follow`, {
    method: action === "follow" ? "post" : "delete",
  });

  if (response.status !== 200) {
    throw new Error(
      `could not ${action} the article : [${response.status}] ${await response.text()}`,
    );
  }
}
