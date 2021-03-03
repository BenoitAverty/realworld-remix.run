import React, { FC } from "react";
import { useRouteData } from "@remix-run/react";
import { User } from "../lib/auth/users";
import { json, Loader, redirect } from "@remix-run/data";
import { getAuthenticatedUser } from "../lib/users/users";
import { withSession } from "../sessionStorage";

const Settings: FC = function Settings() {
  const user = useRouteData<User>();
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    defaultValue={user.image || undefined}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    defaultValue={user.username}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
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
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

export const loader: Loader = async function loader({ request }) {
  return withSession(request)(async session => {
    const user = await getAuthenticatedUser(session);
    if (!user) {
      // TODO manage callback to settings after login
      return redirect("/login");
    }

    return json(user);
  });
};
