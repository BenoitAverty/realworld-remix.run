import { User } from "../../../data/lib/users/users";
import React, { useContext } from "react";

export const userContext = React.createContext<User | null>(null);

export function useUser() {
  return useContext(userContext);
}
