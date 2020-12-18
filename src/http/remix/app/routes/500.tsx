import React from "react";

export function meta() {
  return { title: "Shoot..." };
}

const FiveHundred = function FiveHundred() {
  console.error("Check your server terminal output");

  return (
    <div>
      <h1>500</h1>
    </div>
  );
};

export default FiveHundred;
