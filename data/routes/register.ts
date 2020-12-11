import type { Action, Loader } from "@remix-run/data";
import { parseFormBody, redirect } from "@remix-run/data";
import { UserRegistration } from "../lib/users/users";
import { apiUrl } from "../lib/api-client";

export const loader: Loader = function loader({ session }) {
  const failedRegistration = session.get("failedRegistration");
  if (failedRegistration) {
    return JSON.parse(failedRegistration);
  } else return {};
};

export const action: Action = async function registerUser({ request, session }) {
  // Remix only supports application/x-www-urlencoded for now, and always returns URLSearchParams
  const body = (await parseFormBody(request)) as URLSearchParams;

  const username = body.get("username");
  const email = body.get("email");
  const password = body.get("password");

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

  if (response.status !== 200) {
    const body = await response.json();
    session.flash("failedRegistration", JSON.stringify({ errors: body.errors }));
    return redirect("/register");
  }

  return redirect("/settings");
};
