import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: FC<{ gitCommit: string }> = function Layout({ gitCommit, children }) {
  return (
    <>
      <Header />
      {children}
      <Footer gitCommit={gitCommit} />
    </>
  );
};

export default Layout;
