import type { Action, Loader } from "@remix-run/data";
import { parseFormBody, redirect } from "@remix-run/data";
import { saveAuthToken, UserLogin, UserWithToken } from "../lib/users/users";
import { apiUrl } from "../../common/lib/api-client";

export const loader: Loader = function loader({ session }) {
  const failedLogin = session.get("failedLogin");
  if (failedLogin) {
    return JSON.parse(failedLogin);
  } else return {};
};

export const action: Action = async function loginUser({ request, session }) {
  // Remix only supports application/x-www-urlencoded for now, and always returns URLSearchParams
  const requestBody = (await parseFormBody(request)) as URLSearchParams;

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

    return redirect("/");
  }
};
