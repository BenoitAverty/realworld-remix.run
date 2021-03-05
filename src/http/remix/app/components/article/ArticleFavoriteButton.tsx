import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useRefererQueryParam } from "../../lib/utils";
import classnames from "classnames";

type ArticleFavoriteButtonProps = {
  articleSlug: string;
  isFavorite: boolean;
  className?: string;
};

const ArticleFavoriteButton: FC<ArticleFavoriteButtonProps> = function ArticleFavoriteButton({
  articleSlug,
  isFavorite,
  className,
  children,
}) {
  const refererQueryParam = useRefererQueryParam();

  // TODO investigate why the referer query param stays after the redirection.
  return (
    <Form
      action={`/article/${articleSlug}/favorite?${refererQueryParam}`}
      method="post"
      style={{ display: "inline" }}
    >
      <input type="hidden" name={"favoriteAction"} value={isFavorite ? "unfavorite" : "favorite"} />
      <button type="submit" className={classnames("btn btn-sm btn-outline-primary", className)}>
        {children}
      </button>
    </Form>
  );
};

export default ArticleFavoriteButton;
