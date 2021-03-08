import { createSession } from "@remix-run/data";

import arc, { HttpRequest } from "@architect/functions";
import type { Session } from "@remix-run/core";

export async function getSession(req: HttpRequest) {
  const initialData = await arc.http.session.read(req);
  // console.debug("read session", initialData);
  return createSession(initialData);
}

export function commitSession(session: Session) {
  const sess = session.data;
  // console.debug("saving session", sess);
  return arc.http.session.write(sess);
}

// This is only to conform to remix's own session interface, but it's not used in this specific app.
export function destroySession(session: Session) {
  return arc.http.session.write({});
}
