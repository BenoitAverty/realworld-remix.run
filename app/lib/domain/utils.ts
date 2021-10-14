import { useTransition } from "remix";
import { useLocation } from "react-router-dom";

export type FormErrors = {
  [fieldNameOrGlobal: string]: string[];
};

/** Query param used when an action should redirect back to the page that initiated it. */
export const REFERER_QUERY_PARAM = "referer";

/** Returns true if the form with the given action is currently being submitted */
export function useIsSubmitting(action: string): boolean {
  const pendingForm = useTransition().submission;
  return pendingForm ? pendingForm.action.endsWith(action) : false;
}

/** Build a query param that tells an action to redirect back to the current page */
export function useRefererQueryParam(): string {
  const { pathname, search, hash } = useLocation();
  const currentPage = pathname + search + hash;

  return `${REFERER_QUERY_PARAM}=${currentPage}`;
}
