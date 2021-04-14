import React, { FC } from "react";
import { Action, Form, Loader, useRouteData } from "@remix-run/react";
import { User } from "../lib/auth/users";
import { json, redirect } from "@remix-run/node";
import { getAuthenticatedUser } from "../lib/users/users";
import { withSession } from "../lib/request-utils";
import LoaderButton from "../components/LoaderButton";
import { FormErrors, useIsSubmitting } from "../lib/utils";
import { AUTH_TOKEN_SESSION_KEY } from "../lib/session-utils";
import { updateUser } from "../lib/users/profile";
import ErrorList from "../components/ErrorList";

const Settings: FC = function Settings() {
  const { user, errors } = useRouteData<{ user: User; errors: FormErrors }>();
  const isSubmitting = useIsSubmitting("/settings");
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ErrorList errors={errors && errors.global} />

            <Form action={`/settings`} method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    defaultValue={user.image || undefined}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="newUsername"
                    defaultValue={user.username}
                  />
                  <ErrorList errors={errors && errors.username} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                  >
                    {user.bio}
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    defaultValue={user.email}
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="newPassword"
                  />
                </fieldset>
                <LoaderButton
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </LoaderButton>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

export const loader: Loader = async function loader({ request }) {
  return withSession(request.headers.get("Cookie"))(async session => {
    const user = await getAuthenticatedUser(session);
    if (!user) {
      // TODO manage callback to settings after login
      return redirect("/login");
    }

    const failedSettings = session.get("failedSettings");
    if (failedSettings) {
      return json({ user, errors: JSON.parse(failedSettings).errors });
    }

    return json({ user });
  });
};

export const action: Action = async function action({ request }) {
  return withSession(request.headers.get("Cookie"))(async session => {
    const requestBody = new URLSearchParams(await request.text());

    const image = requestBody.get("image");
    const newUsername = requestBody.get("newUsername");
    const newPassword = requestBody.get("newPassword");
    const bio = requestBody.get("bio");

    if (!newUsername || newUsername.trim() === "") {
      session.flash(
        "failedSettings",
        JSON.stringify({ errors: { username: ["Username can't be blank"] } }),
      );
      return redirect("/settings");
    }

    try {
      await updateUser(
        session.get(AUTH_TOKEN_SESSION_KEY),
        image,
        newUsername.trim(),
        bio,
        newPassword,
      );
    } catch (e) {
      session.flash("failedSettings", JSON.stringify({ errors: { global: [e.message] } }));
    }

    return redirect("/settings");
  });
};
