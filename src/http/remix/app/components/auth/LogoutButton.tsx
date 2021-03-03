import React, { FC } from "react";
import { Form } from "@remix-run/react";

const LogoutButton: FC = function LogoutButton() {
  return (
    <Form action="/login?logout" method="post">
      <button
        type="submit"
        className="btn-link nav-link"
        style={{ paddingLeft: 0, paddingRight: 0, border: "none" }}
      >
        <i className="ion-log-out" />
        &nbsp;logout
      </button>
    </Form>
  );
};

export default LogoutButton;
