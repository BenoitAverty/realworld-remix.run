import React, { FC } from "react";

const CommentForm: FC = function CommentForm() {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea className="form-control" placeholder="Write a comment..." rows={3} />
      </div>
      <div className="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
