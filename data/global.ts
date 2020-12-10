import type { DataLoader } from "@remix-run/core";

export const loader: DataLoader = async () => {
  return {
    date: new Date(),
  };
};
