import { Loader, redirect } from "@remix-run/data";
import { getAuthenticatedUser } from "../lib/users/users";

export const loader: Loader = async function loader({ session }) {
  const user = getAuthenticatedUser(session);

  if (!user) {
    // TODO manage callback to settings after login
    return redirect("/login");
  }

  return user;
};
