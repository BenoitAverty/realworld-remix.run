import React, { FC } from "react";
import EditorLayout from "../components/editor/EditorLayout";
import EditorForm from "../components/editor/EditorForm";
import { ActionFunction, json, LoaderFunction, redirect, useActionData } from "remix";
import { createArticle, isError } from "../lib/domain/article/editor";
import { requireAuthenticatedUser } from "../lib/loaders-actions/auth-utils";

const WriteRoute: FC = function WriteRoute() {
  const actionData = useActionData();
  return (
    <EditorLayout>
      <EditorForm errors={actionData && actionData.errors} />
    </EditorLayout>
  );
};

export default WriteRoute;

export const loader: LoaderFunction = async function loader({ request }) {
  await requireAuthenticatedUser(request);

  return json({});
};

export const action: ActionFunction = async function action({ request }) {
  const { token } = await requireAuthenticatedUser(request);

  const requestBody = new URLSearchParams(await request.text());

  const title = requestBody.get("title");
  const description = requestBody.get("description");
  const body = requestBody.get("body");
  const tags = requestBody.get("tagList");

  const tagList = tags ? tags.split(",").map(t => t.trim()) : [];

  try {
    const result = await createArticle(
      token,
      title as string,
      description as string,
      body as string,
      tagList,
    );
    if (isError(result)) {
      return json(result, { status: 400 });
    }
    return redirect(`/article/${result.article.slug}`);
  } catch (e: any) {
    return json({ errors: { global: [e.message] } }, { status: 500 });
  }
};
