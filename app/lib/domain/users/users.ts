import { fetchWithToken } from "../../data/api-client.server";

/**
 * User object returned from the Conduit api
 */
export type User = {
  /** Displayable name of the user */
  username: string;

  /** User email address */
  email: string;

  /** Small presentation of the user */
  bio: string;

  /** URL of the profile picture */
  image: string | null;
};

export type UserWithToken = User & {
  /** jwt token to use for authenticated requests */
  token: string;
};

/**
 * Registration info submitted by a new user.
 * Send to the API to register.
 */
export type UserRegistration = {
  username: string;
  email: string;
  password: string;
};

/**
 * Login info submitted by an user.
 * Send to the API to login.
 */
export type UserLogin = {
  email: string;
  password: string;
};

/**
 * Get the current user from the api
 * @param apiAuthToken
 */
export async function getUser(apiAuthToken: string): Promise<UserWithToken | null> {
  const fetch = fetchWithToken(apiAuthToken);
  const response = await fetch("/user");

  if (response.status !== 200) {
    return null;
  }

  const body: { user: UserWithToken } = await response.json();

  return body.user;
}
