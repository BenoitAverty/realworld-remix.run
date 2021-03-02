import React, { FC } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { LinksFunction, useRouteData } from "@remix-run/react";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";

import type { Action, Loader } from "@remix-run/data";
import { json, redirect } from "@remix-run/data";
import { saveAuthToken, UserLogin, UserWithToken } from "../lib/users/users";
import { apiUrl } from "../lib/api-client";
import { withSession } from "../sessionStorage";

const Login: FC = function Login() {
  const { errors } = useRouteData();

  return (
    <AuthLayout>
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <Link to="/register">Need an account?</Link>
      </p>

      <ErrorList errors={errors && errors.global} />

      <form action="/login" method="POST">
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
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;

export const loader: Loader = function loader({ request }) {
  return withSession(request)(session => {
    const failedLogin = session.get("failedLogin");
    if (failedLogin) {
      return json(JSON.parse(failedLogin));
    } else return json({});
  });
};

export const action: Action = async function loginUser({ request }) {
  return withSession(request)(async session => {
    const requestBody = new URLSearchParams(await request.text());

    const email = requestBody.get("email");
    const password = requestBody.get("password");

    if (!(email && password)) {
      session.flash(
        "failedLogin",
        JSON.stringify({ errors: { global: ["All fields are required"] } }),
      );
      return redirect("/login");
    }

    const newUser: UserLogin = {
      email,
      password,
    };

    const response = await fetch(apiUrl + "/users/login", {
      method: "POST",
      body: JSON.stringify({ user: newUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();
    if (response.status !== 200) {
      session.flash(
        "failedLogin",
        JSON.stringify({ errors: { global: ["Email or password is incorrect."] } }),
      );
      return redirect("/login");
    } else {
      const user: UserWithToken = responseBody.user;
      saveAuthToken(session, user.token);

      return redirect("/feed");
    }
  });
};

export const links: LinksFunction = () => [{ page: "/feed" }];
