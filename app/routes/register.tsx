import React, { FC } from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import { useRouteData } from "@remix-run/react";
import ErrorList from "../components/ErrorList";

const Register: FC = function Register() {
  const { errors } = useRouteData();

  return (
    <AuthLayout>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <a href="">Have an account?</a>
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
