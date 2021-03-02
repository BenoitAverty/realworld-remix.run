import React, { FC } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { useRouteData } from "@remix-run/react";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";
import type { Action, Loader } from "@remix-run/data";
import { redirect } from "@remix-run/data";
import { saveAuthToken, UserRegistration, UserWithToken } from "../lib/users/users";
import { apiUrl } from "../lib/api-client";

const Register: FC = function Register() {
  const { errors } = useRouteData();

  return (
    <AuthLayout>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <Link to="/login">Have an account?</Link>
      </p>

      <ErrorList errors={errors && errors.global} />

      <form action="/register" method="POST">
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="username"
            placeholder="Your Name"
          />
          <ErrorList errors={errors && errors.username} />
        </fieldset>
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
          Sign up
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;

export const loader: Loader = function loader({ session }) {
  const failedRegistration = session.get("failedRegistration");
  if (failedRegistration) {
    return JSON.parse(failedRegistration);
  } else return {};
};

export const action: Action = async function registerUser({ request, session }) {
  // Remix only supports application/x-www-urlencoded for now, and always returns URLSearchParams
  const requestBody = new URLSearchParams(await request.text());

  const username = requestBody.get("username");
  const email = requestBody.get("email");
  const password = requestBody.get("password");

  if (!(username && email && password)) {
    session.flash(
      "failedRegistration",
      JSON.stringify({ errors: { global: ["All fields are required"] } }),
    );
    return redirect("/register");
  }

  const newUser: UserRegistration = {
    username,
    email,
    password,
  };

  const response = await fetch(apiUrl + "/users", {
    method: "POST",
    body: JSON.stringify({ user: newUser }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();
  if (response.status !== 200) {
    session.flash("failedRegistration", JSON.stringify({ errors: responseBody.errors }));
    return redirect("/register");
  } else {
    const user: UserWithToken = responseBody.user;
    saveAuthToken(session, user.token);

    return redirect("/settings");
  }
};
