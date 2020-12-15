import HideAfterFirstRender from "./HideAfterFirstRender";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

test("HideAfterFirstRender hides its children immediately", () => {
  render(<HideAfterFirstRender>Content</HideAfterFirstRender>);

  expect(screen.queryByText("Content")).not.toBeInTheDocument();
});
