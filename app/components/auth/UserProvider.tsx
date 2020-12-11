import React, { FC } from "react";
import { userContext } from "../../lib/auth/user-context";
import { User } from "../../../data/lib/users/users";

type UserProviderProps = {
  user: User;
};

const UserProvider: FC<UserProviderProps> = function UserProvider({ user, children }) {
  const { Provider } = userContext;
  return <Provider value={user}>{children}</Provider>;
};

export default UserProvider;
