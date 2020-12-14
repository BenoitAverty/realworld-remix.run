import React, { ReactElement, ReactNode } from "react";
import { useUser } from "../../lib/auth/user-context";

type AuthCheckProps = {
  needsAuth?: boolean;
  children: ReactNode | (() => ReactNode);
};

/**
 * Render the children only if the user is authenticated, or only if it is NOT authenticated (if needsAuth is false)
 *
 * Children can be a function which will be called to get the children (This allows to have children that depends on user data
 * and it will only be called if the user data is present)
 */
const AuthCheck = function AuthCheck({
  needsAuth = true,
  children,
}: AuthCheckProps): ReactElement | null {
  const user = useUser();
  console.log(user);

  if ((user && needsAuth) || (!user && !needsAuth)) {
    const node = typeof children === "function" ? children() : <>{children}</>;

    return node;
  }

  return null;
};

export default AuthCheck;
