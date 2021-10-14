import React, { useContext } from "react";
import { User } from "../users/users";

export const userContext = React.createContext<User | null>(null);

export function useUser() {
  return useContext(userContext);
}
