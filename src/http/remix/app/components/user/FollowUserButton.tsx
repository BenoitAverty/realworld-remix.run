import React, { FC } from "react";
import { Form } from "@remix-run/react";
import { useRefererQueryParam } from "../../lib/utils";
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

  // TODO investigate why the referer query param stays after the redirection.
  return (
    <Form
      action={`/profile/${username}/follow?${refererQueryParam}`}
      method="post"
      style={{ display: "inline" }}
    >
      <input type="hidden" name={"followAction"} value={isFollowing ? "unfollow" : "follow"} />
      <button type="submit" className={clsx("btn btn-sm", isFollowing ? "btn-secondary" : " btn-outline-secondary")}>
        <i className="ion-plus-round" />
        &nbsp;{isFollowing ? "Unfollow" : "Follow"} {username}
      </button>
    </Form>
  );
};

export default FollowUserButton;
