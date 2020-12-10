import React, { FC } from "react";

const Footer: FC = function Footer() {
  return (
    <footer>
      <div className="container">
        <a href="/" className="logo-font">
          conduit
        </a>
        <span className="attribution">
          An interactive learning project from{" "}
          <a href="https://thinkster.io">Thinkster</a>. Code & design licensed
          under MIT.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
