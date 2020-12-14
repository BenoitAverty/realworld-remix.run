import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: FC = function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
