import React, { useContext } from "react";
import { User } from "./users";

export const userContext = React.createContext<User | null>(null);

export function useUser() {
  return useContext(userContext);
}
