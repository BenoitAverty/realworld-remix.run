import React, { FC } from "react";
import { userContext } from "../../lib/domain/auth/user-context";
import { User } from "../../lib/domain/users/users";

type UserProviderProps = {
  user: User | null;
};

const UserProvider: FC<UserProviderProps> = function UserProvider({ user, children }) {
  const { Provider } = userContext;
  return <Provider value={user}>{children}</Provider>;
};

export default UserProvider;
