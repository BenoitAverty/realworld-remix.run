import React, { ButtonHTMLAttributes, FC } from "react";

type LoaderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const LoaderButton: FC<LoaderButtonProps> = function LoaderButton({
  children,
  loading = false,
  ...props
}) {
  return (
    <button {...props}>
      {/* TODO: use an actual spinner. This isn't supported by realworld's bootstrap version :( */}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default LoaderButton;
