import { commitSession, getSession } from "../../sessionStorage";
import { redirect } from "remix";
import { getUser, UserWithToken } from "../domain/users/users";

export const AUTH_TOKEN_SESSION_KEY = "api_auth_token";
export type SetCookieHeader = { "Set-Cookie": string };

export async function requireAuthenticatedUser(request: Request): Promise<UserWithToken> {
  const session = await getSession(request.headers.get("Cookie"));

  const apiToken = session.get(AUTH_TOKEN_SESSION_KEY);
  if (!apiToken) {
    // TODO : handle callback after login
    throw redirect("/login");
  }

  const user = await getUser(apiToken);

  if (user === null) {
    session.unset(AUTH_TOKEN_SESSION_KEY);
    const cookieHeader = await commitSession(session);
    throw redirect("/login", { headers: { Cookie: cookieHeader } });
  }

  return user;
}

export async function getAuthenticatedUser(request: Request): Promise<UserWithToken | null> {
  const session = await getSession(request.headers.get("Cookie"));

  const apiToken = session.get(AUTH_TOKEN_SESSION_KEY);
  if (!apiToken) {
    return null;
  }

  return getUser(apiToken);
}

export async function removeAuthToken(request: Request): Promise<SetCookieHeader> {
  const session = await getSession(request.headers.get("Cookie"));

  session.unset(AUTH_TOKEN_SESSION_KEY);

  const cookie = await commitSession(session);
  return { "Set-Cookie": cookie };
}

export async function saveAuthToken(request: Request, token: string): Promise<SetCookieHeader> {
  const session = await getSession(request.headers.get("Cookie"));

  session.set(AUTH_TOKEN_SESSION_KEY, token);

  const cookie = await commitSession(session);
  return { "Set-Cookie": cookie };
}
