import React, { FC, ReactNode } from "react";

type ArticleLayoutProps = {
  body: ReactNode;
  actions: ReactNode;
  comments: ReactNode;
};

// TODO use children instead of a prop here.
const ArticleLayout: FC<ArticleLayoutProps> = function ArticleLayout({ body, actions, comments }) {
  return (
    <div className="container page">
      <div className="row article-content">
        <div className="col-md-12">{body}</div>
      </div>

      <hr />

      <div className="article-actions">{actions}</div>

      {comments}
    </div>
  );
};

export default ArticleLayout;
