import React, { FC } from "react";
import ActivationLink from "../ActivationLink";

const Header: FC = function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <ActivationLink className="nav-link" to="/">
              Home
            </ActivationLink>
          </li>
          <li className="nav-item">
            <ActivationLink className="nav-link" to="/write">
              <i className="ion-compose"></i> New Post
            </ActivationLink>
          </li>
          <li className="nav-item">
            <ActivationLink className="nav-link" to="/settings">
              <i className="ion-gear-a"></i> Settings
            </ActivationLink>
          </li>
          <li className="nav-item">
            <ActivationLink className="nav-link" to="/register">
              Sign up
            </ActivationLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
