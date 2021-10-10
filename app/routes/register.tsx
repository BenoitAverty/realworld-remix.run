import React, { FC } from "react";
import AuthLayout from "../components/user/AuthLayout";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, redirect, useLoaderData } from "remix";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";
import { UserRegistration, UserWithToken } from "../lib/users/users";
import { fetchWithApiUrl } from "../lib/api-client.server";
import LoaderButton from "../components/LoaderButton";
import { useIsSubmitting } from "../lib/utils";
import { withSession } from "../lib/request-utils";
import { saveAuthToken } from "../lib/session-utils";

const Register: FC = function Register() {
  const { errors } = useLoaderData();

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

export const loader: LoaderFunction = async function loader({ request }) {
  return withSession(request.headers.get("Cookie"))(session => {
    const failedRegistration = session.get("failedRegistration");
    if (failedRegistration) {
      return json(JSON.parse(failedRegistration));
    } else return json({});
  });
};

export const action: ActionFunction = async function registerUser({ request }) {
  const fetch = fetchWithApiUrl();
  return withSession(request.headers.get("Cookie"))(async session => {
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

    const response = await fetch("/users", {
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
