import { fetchWithToken } from "../../data/api-client.server";

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
    throw new Error(`could not ${action} the user : [${response.status}] ${await response.text()}`);
  }
}

export async function updateUser(
  apiAuthToken: string,
  image: string | null,
  username: string,
  bio: string | null,
  newPassword: string | null,
): Promise<void> {
  const fetch = fetchWithToken(apiAuthToken);

  const user: any = {
    username,
    bio,
    image,
  };

  if (newPassword && newPassword !== "") {
    user.password = newPassword;
  }

  const response = await fetch("/user", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.status !== 200) {
    const message = await response.text();
    throw new Error(`Could not update settings : ${message}`);
  }
}
