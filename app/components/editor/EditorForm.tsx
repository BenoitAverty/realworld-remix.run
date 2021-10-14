import React, { FC } from "react";
import { Form } from "remix";
import { EditorFormErrors } from "../../lib/domain/article/editor";
import { useIsSubmitting } from "../../lib/domain/utils";
import ErrorList from "../ErrorList";

const EditorForm: FC<EditorFormErrors> = function EditorForm({ errors }) {
  const isSubmitting = useIsSubmitting("/write");
  return (
    <>
      <ErrorList errors={errors && errors.global} />
      <Form action="/write" method="post">
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              name="title"
              className="form-control form-control-lg"
              placeholder="Article Title"
            />
            <ErrorList errors={errors && errors.title} />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="What's this article about?"
            />
            <ErrorList errors={errors && errors.description} />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              name="body"
              rows={8}
              placeholder="Write your article (in markdown)"
            />
            <ErrorList errors={errors && errors.body} />
          </fieldset>
          <fieldset className="form-group">
            <input type="text" name="tagList" className="form-control" placeholder="Enter tags" />
            <ErrorList errors={errors && errors.tagList} />
            {/* TODO: when modifying an article : <div className="tag-list"/> */}
          </fieldset>
          <button
            className="btn btn-lg pull-xs-right btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Publish Article
          </button>
        </fieldset>
      </Form>
    </>
  );
};

export default EditorForm;
