import { usePendingFormSubmit } from "@remix-run/react";

export function useIsSubmitting(action: string): boolean {
  const pendingForm = usePendingFormSubmit();
  return pendingForm ? pendingForm.action.endsWith(action) : false;
}
