import React from "react";
import { json, LinksFunction, LoaderFunction, useCatch, useLoaderData } from "remix";
import Layout from "./components/layout/Layout";
import Document from "./components/Document";
import UserProvider from "./components/user/UserProvider";
import { Outlet } from "react-router-dom";
import { User } from "./lib/domain/users/users";
// @ts-ignore
import realworldBootstrap from "./styles/realworld-bootstrap.css";
import { getAuthenticatedUser } from "./lib/loaders-actions/auth-utils";
import Layout404 from "./components/layout/404";

type RootData = {
  user: User | null;
  gitCommit: string;
};

const Root = function Root() {
  const data: RootData = useLoaderData();

  return (
    <Document>
      <UserProvider user={data.user}>
        <Layout gitCommit={data.gitCommit}>
          <Outlet />
        </Layout>
      </UserProvider>
    </Document>
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
export const loader: LoaderFunction = async ({ request }) => {
  const userWithToken = await getAuthenticatedUser(request);

  if (userWithToken) {
    const { token, ...user } = userWithToken;
    return json({ user, gitCommit: process.env.GIT_COMMIT });
  } else {
    return json({
      user: null,
      gitCommit: process.env.GIT_COMMIT,
    });
  }
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: realworldBootstrap },
    { rel: "stylesheet", href: "//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" },
    {
      rel: "stylesheet",
      href: "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
    },
  ];
};

export const CatchBoundary = function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 404:
      return (
        <Document title="Ain't nothing here">
          <Layout404 backlinkTo="/" backlinkText="Back to home" title="This page doesn't exist" />
        </Document>
      );
  }
};
