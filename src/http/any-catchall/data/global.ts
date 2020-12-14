import type { DataLoader } from "@remix-run/core";
import { getAuthenticatedUser, User } from "./lib/users/users";

export type GlobalData = {
  user: User;
};

/**
 * Loads the user to use in the application outside specific authenticated page.
 *
 * If the user is not logged-in, simply use `null` as the user so the app knows there is no authenticated user.
 *
 * Pages that needs authentication should verify authentication in their own loader and redirect if needed.
 */
export const loader: DataLoader = async ({ session }) => {
  // Ugly workaround for sessions.
  session.set("dummy", "dummy");
  session.set("dummy2", "dummy");

  const user = await getAuthenticatedUser(session);

  return {
    user,
  };
};
