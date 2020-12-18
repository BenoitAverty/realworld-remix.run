import type { Action, Loader } from "@remix-run/data";
import { parseFormBody, redirect } from "@remix-run/data";
import { saveAuthToken, UserRegistration, UserWithToken } from "../lib/users/users";
import { apiUrl } from "../lib/api-client";

export const loader: Loader = function loader({ session }) {
  const failedRegistration = session.get("failedRegistration");
  if (failedRegistration) {
    return JSON.parse(failedRegistration);
  } else return {};
};

export const action: Action = async function registerUser({ request, session }) {
  // Remix only supports application/x-www-urlencoded for now, and always returns URLSearchParams
  const requestBody = (await parseFormBody(request)) as URLSearchParams;

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
