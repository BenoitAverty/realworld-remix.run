import React, { FC } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { Form, useRouteData } from "@remix-run/react";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";
import type { Action, Loader } from "@remix-run/data";
import { json, redirect } from "@remix-run/data";
import { saveAuthToken, UserRegistration, UserWithToken } from "../lib/users/users";
import { apiUrl } from "../lib/api-client";
import LoaderButton from "../components/LoaderButton";
import { useIsSubmitting } from "../lib/utils";
import { withSession } from "../lib/request-utils";

const Register: FC = function Register() {
  const { errors } = useRouteData();

  const isSubmitting = useIsSubmitting("/register");

  return (
    <AuthLayout>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <Link to="/login">Have an account?</Link>
      </p>

      <ErrorList errors={errors && errors.global} />

      <Form action="/register" method="post">
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
        <LoaderButton
          type="submit"
          className="btn btn-lg btn-primary pull-xs-right"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Sign up
        </LoaderButton>
      </Form>
    </AuthLayout>
  );
};

export default Register;

export const loader: Loader = async function loader({ context }) {
  return withSession(context.arcRequest)(session => {
    const failedRegistration = session.get("failedRegistration");
    if (failedRegistration) {
      return json(JSON.parse(failedRegistration));
    } else return json({});
  });
};

export const action: Action = async function registerUser({ request, context }) {
  return withSession(context.arcRequest)(async session => {
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
  });
};
