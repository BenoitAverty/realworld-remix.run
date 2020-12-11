import React, { FC } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

const ActivationLink: FC<LinkProps> = function ({ className, children, ...props }) {
  const { pathname } = useLocation();

  const to = props.to;
  const toPath =
    typeof to === "string" ? new URL(to, "http://localhost/").pathname : to.pathname || pathname;
  const isActive = toPath === pathname;

  const initialClassName = className || "";
  const computedClassName = initialClassName + (isActive ? " active" : "");

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActivationLink;
