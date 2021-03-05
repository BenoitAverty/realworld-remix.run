import { Request } from "node-fetch";
import { Session } from "@remix-run/core";
import { Response } from "@remix-run/core/fetch";
import { commitSession, getSession } from "../sessionStorage";
import { AUTH_TOKEN_SESSION_KEY } from "./users/users";

// TODO this works weird with flash session objects and multiple loaders per request (like at /login). see https://discord.com/channels/770287896669978684/771068344320786452/816401869437796352
// If two loaders set cookies, the parent route takes precedence.
export function withSession(request: Request, readOnly = false) {
  return async (fn: (session: Session) => Response | Promise<Response>) => {
    const session = await getSession(request.headers.get("Cookie") || undefined);
    // console.log("session before", JSON.stringify(session));
    const result = await fn(session);
    // console.log("session after", JSON.stringify(session));
    if (!readOnly) {
      result.headers.set("Set-Cookie", await commitSession(session));
    }
    return result;
  };
}

export function withAuthToken(request: Request) {
  return async function <T>(fn: (token: string | null) => T | Promise<T>) {
    const session = await getSession(request.headers.get("Cookie") || undefined);
    const token = session.get(AUTH_TOKEN_SESSION_KEY) || null;
    return fn(token);
  };
}
