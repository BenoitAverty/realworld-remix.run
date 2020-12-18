import React, { FC } from "react";
import ActivationLink from "../ActivationLink";
import { useGlobalData } from "@remix-run/react";
import { GlobalData } from "../../../data/global";
import AuthCheck from "../auth/AuthCheck";
import { Link } from "react-router-dom";

const Header: FC = function Header() {
  const { user } = useGlobalData<GlobalData>();

  return (
    <nav data-testid="navbar" className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <ActivationLink className="nav-link" to="/">
              Home
            </ActivationLink>
          </li>
          <AuthCheck>
            {() => (
              <>
                <li className="nav-item">
                  <ActivationLink className="nav-link" to="/write">
                    <i className="ion-compose" /> New Post
                  </ActivationLink>
                </li>
                <li className="nav-item">
                  <ActivationLink className="nav-link" to="/settings">
                    <i className="ion-gear-a" /> Settings
                  </ActivationLink>
                </li>
                <li className="nav-item">
                  <ActivationLink className="nav-link" to={`/profile/${user.username}`}>
                    @{user.username}
                  </ActivationLink>
                </li>
              </>
            )}
          </AuthCheck>
          <AuthCheck needsAuth={false}>
            <li className="nav-item">
              <ActivationLink className="nav-link" to="/login">
                Sign in
              </ActivationLink>
            </li>
            <li className="nav-item">
              <ActivationLink className="nav-link" to="/register">
                Sign up
              </ActivationLink>
            </li>
          </AuthCheck>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
