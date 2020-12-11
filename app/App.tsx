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
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
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
