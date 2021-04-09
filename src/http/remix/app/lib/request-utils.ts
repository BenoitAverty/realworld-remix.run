import { Session, redirect } from "@remix-run/node";
import { Response } from "@remix-run/node/fetch";
import { commitSession, getSession } from "../sessionStorage";
import { HttpRequest } from "@architect/functions";

import { AUTH_TOKEN_SESSION_KEY } from "./session-utils";

// TODO this works weird with flash session objects and multiple loaders per request (like at /login). see https://discord.com/channels/770287896669978684/771068344320786452/816401869437796352
// If two loaders set cookies, the parent route takes precedence.
export function withSession(arcRequest: HttpRequest, readOnly = false) {
  return async (fn: (session: Session) => Response | Promise<Response>) => {
    const session = await getSession(arcRequest);
    const result = await fn(session);
    if (!readOnly) {
      result.headers.set("Set-Cookie", await commitSession(session));
    }
    return result;
  };
}

export function withAuthToken(arcRequest: HttpRequest) {
  return async function <T>(fn: (token: string | null) => T | Promise<T>) {
    const session = await getSession(arcRequest);
    const token = session.get(AUTH_TOKEN_SESSION_KEY) || null;
    return fn(token);
  };
}

// TODO probably a refactor to make use of `withAuthToken`
export function requireAuthenticatedUsed(arcRequest: HttpRequest) {
  return async (fn: (apiAuthToken: string) => Response | Promise<Response>) => {
    const session = await getSession(arcRequest);
    if (!session || !session.get(AUTH_TOKEN_SESSION_KEY)) {
      return redirect("/login");
    }
    return fn(session.get(AUTH_TOKEN_SESSION_KEY));
  };
}
