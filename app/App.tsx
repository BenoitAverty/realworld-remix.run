import React from "react";
import { Meta, Scripts, Styles, Routes, useGlobalData } from "@remix-run/react";
import Layout from "./components/layout/Layout";

export default function App() {
  let data = useGlobalData();

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
}
