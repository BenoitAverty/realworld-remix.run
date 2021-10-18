import React, { FC } from "react";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, redirect, useActionData, useLoaderData } from "remix";
import { User } from "../lib/domain/users/users";
import LoaderButton from "../components/LoaderButton";
import { FormErrors, useIsSubmitting } from "../lib/domain/utils";
import { updateUser } from "../lib/domain/users/profile";
import ErrorList from "../components/ErrorList";
import { requireAuthenticatedUser } from "../lib/loaders-actions/auth-utils";

const Settings: FC = function Settings() {
  const { user } = useLoaderData<{ user: User }>();
  const actionData = useActionData();
  const errors: FormErrors | null = actionData && actionData.errors;

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
                    defaultValue={user.bio}
                  />
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

export const loader: LoaderFunction = async function loader({ request }) {
  const user = await requireAuthenticatedUser(request);

  return json({ user });
};

export const action: ActionFunction = async function action({ request }) {
  const user = await requireAuthenticatedUser(request);

  const requestBody = new URLSearchParams(await request.text());

  const image = requestBody.get("image");
  const newUsername = requestBody.get("newUsername");
  const newPassword = requestBody.get("newPassword");
  const bio = requestBody.get("bio");

  if (!newUsername || newUsername.trim() === "") {
    return json({ errors: { username: ["Username can't be blank"] } }, { status: 400 });
  }

  try {
    await updateUser(user.token, image, newUsername.trim(), bio, newPassword);
  } catch (e: any) {
    return json({ errors: { global: [e.message] } }, { status: 500 });
  }

  return redirect("/settings");
};
