import React from "react";
import { Meta, Scripts, Styles, useRouteData } from "@remix-run/react";
import Layout from "./components/layout/Layout";
import UserProvider from "./components/auth/UserProvider";
import { Outlet } from "react-router-dom";
import { getAuthenticatedUser, User } from "./lib/users/users";
import { Loader } from "@remix-run/data";

type RootData = {
  user: User | null;
};

const Root = function Root() {
  const data: RootData = useRouteData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Styles />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <UserProvider user={data.user}>
          <Layout>
            <Outlet />
          </Layout>
          <Scripts />
        </UserProvider>
      </body>
    </html>
  );
};

export default Root;

/**
 * Loads the user to use in the application outside specific authenticated page.
 *
 * If the user is not logged-in, simply use `null` as the user so the app knows there is no authenticated user.
 *
 * Pages that needs authentication should verify authentication in their own loader and redirect if needed.
 */
export const loader: Loader = async ({ session }): Promise<RootData> => {
  // Ugly workaround for sessions.
  session.set("dummy", "dummy");
  session.set("dummy2", "dummy");

  const userWithToken = await getAuthenticatedUser(session);

  if (userWithToken) {
    const { token, ...user } = userWithToken;
    return { user };
  } else {
    return {
      user: null,
    };
  }
};
