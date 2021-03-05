import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useRefererQueryParam } from "../../lib/utils";
import clsx from "clsx";

type ArticleFavoriteButtonProps = {
  articleSlug: string;
  isFavorite: boolean;
  className?: string;
};

// TODO sometimes after a submit of this form the icon or the number doesn't update without a refresh. Why ?
//  Maybe because swr does the fetch without the token yet.
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
      <button type="submit" className={clsx("btn btn-sm btn-outline-primary", className)}>
        <i className={isFavorite ? "ion-heart-broken" : "ion-heart"} />
        &nbsp;{children}
      </button>
    </Form>
  );
};

export default ArticleFavoriteButton;
