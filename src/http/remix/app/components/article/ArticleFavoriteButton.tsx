import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useRefererQueryParam } from "../../lib/utils";

type ArticleFavoriteButtonProps = {
  articleSlug: string;
  isFavorite: boolean;
};

const ArticleFavoriteButton: FC<ArticleFavoriteButtonProps> = function ArticleFavoriteButton({
  articleSlug,
  isFavorite,
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
      <button type="submit" className="btn btn-sm btn-outline-primary">
        {children}
      </button>
    </Form>
  );
};

export default ArticleFavoriteButton;
