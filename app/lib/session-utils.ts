import type { Session } from "remix";

export const AUTH_TOKEN_SESSION_KEY = "api_auth_token";

export function saveAuthToken(session: Session, token: string) {
  session.set(AUTH_TOKEN_SESSION_KEY, token);
}

export function removeAuthToken(session: Session) {
  session.unset(AUTH_TOKEN_SESSION_KEY);
}
