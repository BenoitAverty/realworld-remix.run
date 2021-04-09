import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useIsSubmitting, useRefererQueryParam } from "../../lib/utils";
import clsx from "clsx";

type ArticleFavoriteButtonProps = {
  articleSlug: string;
  favoritesCount: number;
  isFavorite: boolean;
  className?: string;
  full?: boolean;
};

const ArticleFavoriteButton: FC<ArticleFavoriteButtonProps> = function ArticleFavoriteButton({
  articleSlug,
  favoritesCount,
  isFavorite,
  className,
  full = false,
}) {
  const refererQueryParam = useRefererQueryParam();
  const action = `/article/${articleSlug}/favorite?${refererQueryParam}`;

  const isSubmitting = useIsSubmitting(action);

  // Adjust values if we're currently submitting (anticipate the value once the action is successful)
  const optimisticIsFavorite = isSubmitting ? !isFavorite : isFavorite;
  const optimisticFavoritesCount = !isSubmitting
    ? favoritesCount
    : optimisticIsFavorite
    ? favoritesCount + 1
    : favoritesCount - 1;

  const ButtonContent = full ? FullButtonText : ShortButtonText;

  // TODO investigate why the referer query param stays after the redirection.
  return (
    <Form action={action} method="post" style={{ display: "inline" }}>
      <input
        type="hidden"
        name={"favoriteAction"}
        value={optimisticIsFavorite ? "unfavorite" : "favorite"}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "btn btn-sm",
          optimisticIsFavorite ? "btn-primary" : "btn-outline-primary",
          className,
        )}
      >
        <i className={optimisticIsFavorite ? "ion-heart-broken" : "ion-heart"} />
        &nbsp;
        <ButtonContent count={optimisticFavoritesCount} isFavorite={optimisticIsFavorite} />
      </button>
    </Form>
  );
};

export default ArticleFavoriteButton;

const FullButtonText = function ({ count, isFavorite }: { count: number; isFavorite: boolean }) {
  return (
    <>
      {isFavorite ? "Unfavorite post" : "Favorite post"}&nbsp;
      <span className="counter">({count})</span>
    </>
  );
};

const ShortButtonText = function ({ count }: { count: number }) {
  return <>{count}</>;
};
