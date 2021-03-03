import { createCookieSessionStorage } from "@remix-run/data";
import type { Session } from "@remix-run/core";
import type { Request } from "node-fetch";
import { Response } from "@remix-run/core/fetch";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__realworld_session",
    secrets: ["omg"],
    sameSite: "lax",
  },
});

// TODO this works weird with flash session objects and multiple loaders per request (like at /login). see https://discord.com/channels/770287896669978684/771068344320786452/816401869437796352
// If two loaders set cookies, the parent route takes precedence.
function withSession(request: Request, readOnly = false) {
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

export { getSession, commitSession, destroySession, withSession };
