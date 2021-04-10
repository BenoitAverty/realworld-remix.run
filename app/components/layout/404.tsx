import React, { FC } from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";

type Layout404Props = {
  children?: never;
  title: string;
  backlinkTo: string;
  backlinkText: string;
};

const Layout404: FC<Layout404Props> = function Layout404({ title, backlinkText, backlinkTo }) {
  return (
    <div className="article-page">
      <Banner>
        <h1>{title}</h1>
      </Banner>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <Link to={backlinkTo}>{backlinkText}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout404;
