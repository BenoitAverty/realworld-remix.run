import { MetaFunction } from "remix";
import React from "react";
import Layout404 from "../components/layout/404";

export const meta: MetaFunction = function meta() {
  return { title: "Ain't nothing here" };
};

const FourOhFour = function FourOhFour() {
  return <Layout404 backlinkTo="/" backlinkText="Back to home" title="This page doesn't exist" />;
};

export default FourOhFour;
