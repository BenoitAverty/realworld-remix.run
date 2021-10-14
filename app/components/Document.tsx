import { Links, LiveReload, Meta, Scripts } from "remix";
import React, { FC } from "react";

const Document: FC<{ title?: string }> = function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default Document;
