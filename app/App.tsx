import React from "react";
import { Meta, Routes, Scripts, Styles } from "@remix-run/react";
import Layout from "./components/layout/Layout";

const App = function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Styles />
      </head>
      <body>
        <Layout>
          <Routes />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
};

export default App;
