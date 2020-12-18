import React, { FC } from "react";

const TagList: FC = function TagList({ children }) {
  return <div className="tag-list">{children}</div>;
};

export default TagList;
