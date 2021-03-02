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

function withSession(request: Request) {
  return async (fn: (session: Session) => Response | Promise<Response>) => {
    const session = await getSession(request.headers.get("Cookie") || undefined);
    console.log("session before", JSON.stringify(session));
    const result = await fn(session);
    console.log("session after", JSON.stringify(session));
    result.headers.set("Set-Cookie", await commitSession(session));
    return result;
  };
}

export { getSession, commitSession, destroySession, withSession };
