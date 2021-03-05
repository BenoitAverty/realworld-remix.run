import { createCookieSessionStorage } from "@remix-run/data";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__realworld_session",
    secrets: ["omg"],
    sameSite: "lax",
    path: "/",
  },
});

export { getSession, commitSession, destroySession };
