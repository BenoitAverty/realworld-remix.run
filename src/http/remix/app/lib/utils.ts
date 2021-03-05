// Query param used when an action should redirect back to the page that initiated it.
import { usePendingFormSubmit } from "@remix-run/react";
import { useLocation } from "react-router-dom";

export const REFERER_QUERY_PARAM = "referer";

export function useIsSubmitting(action: string): boolean {
  const pendingForm = usePendingFormSubmit();
  return pendingForm ? pendingForm.action.endsWith(action) : false;
}

export function useRefererQueryParam(): string {
  const { pathname, search, hash } = useLocation();
  const currentPage = pathname + search + hash;

  return `${REFERER_QUERY_PARAM}=${currentPage}`;
}
