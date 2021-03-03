import { MetaFunction } from "@remix-run/data";
import React from "react";

export const meta: MetaFunction = function meta() {
  return { title: "Ain't nothing here" };
};

const FourOhFour = function FourOhFour() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default FourOhFour;
