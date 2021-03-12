import React, { FC } from "react";
import ActivationLink from "../ActivationLink";
import AuthCheck from "../user/AuthCheck";

type FeedToggleProps = {
  tag?: string;
};

const FeedToggle: FC<FeedToggleProps> = function FeedToggle({ tag }) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <AuthCheck>
          <li className="nav-item">
            <ActivationLink to="/feed" className="nav-link">
              Your Feed
            </ActivationLink>
          </li>
        </AuthCheck>
        <li className="nav-item">
          <ActivationLink className="nav-link" to="/">
            Global Feed
          </ActivationLink>
        </li>
        {tag && (
          <li className="nav-item">
            <a className="nav-link" href="">
              #{tag}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
