import ActivationLink from "./ActivationLink";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("ActivationLink", () => {
  test("Keeps initial className", async () => {
    const history = createMemoryHistory();
    history.push("/");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to="/greeting">
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).toHaveClass("toto");
    expect(link).not.toHaveClass("active");
  });

  test("Adds active class on route match", () => {
    const history = createMemoryHistory();
    history.push("/greeting");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to="/greeting">
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).toHaveClass("toto", "active");
  });

  test("Does not add active class on sub-route match", () => {
    const history = createMemoryHistory();
    history.push("/greeting/other");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to="/greeting">
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).not.toHaveClass("active");
  });

  test("Does not add active class on super-route match", () => {
    const history = createMemoryHistory();
    history.push("/greeting");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to="/greeting/other">
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).not.toHaveClass("active");
  });

  test("Adds active class with object destination", () => {
    const history = createMemoryHistory();
    history.push("/greeting");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to={{ pathname: "/greeting" }}>
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).toHaveClass("active");
  });

  test("Adds active class with query params", () => {
    const history = createMemoryHistory();
    history.push("/greeting?query=param");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to={{ pathname: "/greeting" }}>
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).toHaveClass("active");
  });

  test("Adds active class with query params and hashes", () => {
    const history = createMemoryHistory();
    history.push("/greeting?query=param#hash");
    render(
      <Router location={history.location} navigator={history}>
        <ActivationLink className="toto" to={{ pathname: "/greeting", search: "?toto" }}>
          Test
        </ActivationLink>
      </Router>,
    );

    const link = screen.getByText("Test");
    expect(link).toHaveClass("active");
  });
});
