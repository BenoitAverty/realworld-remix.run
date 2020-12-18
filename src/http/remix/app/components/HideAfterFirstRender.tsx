import React, { FC, useEffect, useState } from "react";

/**
 * Hides the children immediately with an effect hook.
 *
 * This is useful to hide a component on the client (without causing a React warning because of a hydration mismatch) but have that
 * component in the server response (for search engines or for the user with javascript disabled)
 */
const HideAfterFirstRender: FC = function HideAfterFirstRender({ children }) {
  const [showChildren, setShowChildren] = useState(true);
  useEffect(() => setShowChildren(false), []);

  return showChildren ? <>{children}</> : null;
};

export default HideAfterFirstRender;
