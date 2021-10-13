import React, { FC } from "react";
import AuthLayout from "../components/user/AuthLayout";
import type { ActionFunction } from "remix";
import { Form, json, LinksFunction, redirect, useActionData } from "remix";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";
import { UserLogin, UserWithToken } from "../lib/users/users";
import { fetchWithApiUrl } from "../lib/api-client.server";
import LoaderButton from "../components/LoaderButton";
import { useIsSubmitting } from "../lib/utils";
import { withSession } from "../lib/request-utils";
import { removeAuthToken, saveAuthToken } from "../lib/session-utils";

const Login: FC = function Login() {
  const actionData = useActionData();
  const errors = actionData && actionData.errors;
  const isSubmitting = useIsSubmitting("/login");

  return (
    <AuthLayout>
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <Link to="/register">Need an account?</Link>
      </p>

      <ErrorList errors={errors && errors.global} />

      <Form action="/login" method="post">
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="email"
            placeholder="Email"
          />

          <ErrorList errors={errors && errors.email} />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            placeholder="Password"
          />

          <ErrorList errors={errors && errors.password} />
        </fieldset>
        <LoaderButton
          className="btn btn-lg btn-primary pull-xs-right"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </LoaderButton>
      </Form>
    </AuthLayout>
  );
};

export default Login;

export const action: ActionFunction = async function loginUser({ request }) {
  const fetch = fetchWithApiUrl();
  const isLogout = new URL(request.url).searchParams.get("logout") !== null;

  return withSession(request.headers.get("Cookie"))(async session => {
    if (isLogout) {
      removeAuthToken(session);
      return redirect("/");
    } else {
      const requestBody = new URLSearchParams(await request.text());

      const email = requestBody.get("email");
      const password = requestBody.get("password");

      if (!(email && password)) {
        return json({ errors: { global: ["All fields are required"] } }, { status: 400 });
      }

      const newUser: UserLogin = {
        email,
        password,
      };

      const response = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify({ user: newUser }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();
      if (response.status !== 200) {
        return json({ errors: { global: ["Email or password is incorrect."] } }, { status: 401 });
      } else {
        const user: UserWithToken = responseBody.user;
        saveAuthToken(session, user.token);

        return redirect("/feed");
      }
    }
  });
};

export const links: LinksFunction = () => [{ page: "/feed" }];
