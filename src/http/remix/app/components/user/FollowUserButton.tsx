import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useIsSubmitting, useRefererQueryParam } from "../../lib/utils";
import clsx from "clsx";

type FollowUserButtonProps = {
  username: string;
  isFollowing: boolean;
};

const FollowUserButton: FC<FollowUserButtonProps> = function FollowUserButton({
  username,
  isFollowing,
}) {
  const refererQueryParam = useRefererQueryParam();
  const action = `/profile/${username}/follow?${refererQueryParam}`;

  const isSubmitting = useIsSubmitting(action);

  // Invert the "isFollowing" flag if we're currently submitting (which means the user clicked but the request hasn't finished yet)
  // This is the most readable way to make a XOR in javascript
  const optimisticIsFollowing = isSubmitting ? !isFollowing : isFollowing;

  // TODO investigate why the referer query param stays after the redirection.
  return (
    <Form action={action} method="post" style={{ display: "inline" }}>
      <input
        type="hidden"
        name={"followAction"}
        value={optimisticIsFollowing ? "unfollow" : "follow"}
      />
      <button
        type="submit"
        className={clsx(
          "btn btn-sm",
          optimisticIsFollowing ? "btn-secondary" : " btn-outline-secondary",
        )}
      >
        <i className="ion-plus-round" />
        &nbsp;{optimisticIsFollowing ? "Unfollow" : "Follow"} {username}
      </button>
    </Form>
  );
};

export default FollowUserButton;
