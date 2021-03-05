import React from "react";
import { Links, LinksFunction, Meta, Scripts, useRouteData } from "@remix-run/react";
import Layout from "./components/layout/Layout";
import UserProvider from "./components/auth/UserProvider";
import { Outlet } from "react-router-dom";
import { getAuthenticatedUser, User } from "./lib/users/users";
import { json, Loader } from "@remix-run/data";
import realworldBootstrap from "url:./styles/realworld-bootstrap.css";
import { withSession } from "./lib/request-utils";

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
        <Links />
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
export const loader: Loader = async ({ request }) => {
  // TODO this "withSession" can override sessions set in other loaders. It probably needs to be changed into a read-only version without commitSession.
  return withSession(
    request,
    true,
  )(async session => {
    const userWithToken = await getAuthenticatedUser(session);

    if (userWithToken) {
      const { token, ...user } = userWithToken;
      return json({ user });
    } else {
      return json({
        user: null,
      });
    }
  });
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: realworldBootstrap },
    { rel: "stylesheet", href: "//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" },
    {
      rel: "stylesheet",
      href:
        "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
    },
  ];
};
