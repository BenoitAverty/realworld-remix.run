import React, { FC } from "react";
import AuthLayout from "../components/user/AuthLayout";
import type { ActionFunction } from "remix";
import { Form, json, redirect, useActionData } from "remix";
import ErrorList from "../components/ErrorList";
import { Link } from "react-router-dom";
import { UserRegistration, UserWithToken } from "../lib/domain/users/users";
import { fetchWithApiUrl } from "../lib/data/api-client.server";
import LoaderButton from "../components/LoaderButton";
import { useIsSubmitting } from "../lib/domain/utils";
import { saveAuthToken } from "../lib/loaders-actions/auth-utils";

const Register: FC = function Register() {
  const actionData = useActionData();
  const errors = actionData && actionData.errors;

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

export const action: ActionFunction = async function registerUser({ request }) {
  const fetch = fetchWithApiUrl();

  const requestBody = new URLSearchParams(await request.text());

  const username = requestBody.get("username");
  const email = requestBody.get("email");
  const password = requestBody.get("password");

  if (!(username && email && password)) {
    return json({ errors: { global: ["All fields are required"] } }, { status: 400 });
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
    return json({ errors: responseBody.errors }, { status: 400 });
  } else {
    const user: UserWithToken = responseBody.user;

    const cookieHeader = await saveAuthToken(request, user.token);

    return redirect("/settings", { headers: { ...cookieHeader } });
  }
};
