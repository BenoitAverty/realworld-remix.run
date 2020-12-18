import AuthCheck from "./AuthCheck";
import UserProvider from "./UserProvider";
import { render, screen } from "@testing-library/react";
import React, { FC } from "react";

const FakeUserProvider: FC = ({ children }) => (
  <UserProvider user={{ username: "FakeUser", email: "fake@gmail.com", bio: "Bio", image: null }}>
    {children}
  </UserProvider>
);

const NoUserProvider: FC = ({ children }) => <UserProvider user={null}>{children}</UserProvider>;

describe("AuthCheck", () => {
  test("Shows content when user is authenticated", () => {
    render(
      <FakeUserProvider>
        <AuthCheck>Content</AuthCheck>
      </FakeUserProvider>,
    );

    expect(screen.queryByText("Content")).toBeInTheDocument();
  });

  test("Does not render content when no user is present", () => {
    render(
      <NoUserProvider>
        <AuthCheck>Content</AuthCheck>
      </NoUserProvider>,
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  test("Calls a child function to render content", () => {
    render(
      <FakeUserProvider>
        <AuthCheck>{user => <div>Content {user.username}</div>}</AuthCheck>
      </FakeUserProvider>,
    );

    expect(screen.queryByText("Content FakeUser")).toBeInTheDocument();
  });

  test("Renders child when needsAuth is false", () => {
    render(
      <NoUserProvider>
        <AuthCheck needsAuth={false}>
          <div>Content</div>
        </AuthCheck>
      </NoUserProvider>,
    );

    expect(screen.queryByText("Content")).toBeInTheDocument();
  });

  test("Does not render child when needsAuth is false", () => {
    render(
      <FakeUserProvider>
        <AuthCheck needsAuth={false}>
          <div>Content</div>
        </AuthCheck>
      </FakeUserProvider>,
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});
