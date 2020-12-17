import React, { FC } from "react";

type ErrorListProps = {
  errors: string[] | null | undefined;
};

const ErrorList: FC<ErrorListProps> = function ErrorListProps({ errors }) {
  if (errors && errors.length > 0) {
    return (
      <ul className="error-messages">
        {errors.map((e: string) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    );
  } else return null;
};

export default ErrorList;
