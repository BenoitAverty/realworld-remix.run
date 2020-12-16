import React, { CSSProperties, FC, useLayoutEffect, useState } from "react";

const Footer: FC = function Footer() {
  // The footer starts at the end of the content, but the we fix it at the bottom of the window to
  // make it visible with infinite scroll.
  // If the user has JS disabled, the footer stays at the end of the content, which is fine because infinite scroll won't happen.
  const [anchorToBottom, setAnchorToBottom] = useState(false);
  useLayoutEffect(() => setAnchorToBottom(true), [setAnchorToBottom]);

  return (
    <footer style={anchorToBottom ? footerStyle : undefined}>
      <div className="container">
        <a href="/" className="logo-font">
          conduit
        </a>
        <span className="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &
          design licensed under MIT.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

const footerStyle: CSSProperties = {
  position: "fixed",
  bottom: 0,
};
