import React, { FC } from "react";

const EditorLayout: FC = function EditorLayout({ children }) {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
