import React, { FC } from "react";
import EditorLayout from "../components/editor/EditorLayout";
import EditorForm from "../components/editor/EditorForm";
import { ActionFunction, json, LoaderFunction, redirect, useActionData } from "remix";
import { withSession } from "../lib/request-utils";
import { createArticle, isError } from "../lib/article/editor";
import { AUTH_TOKEN_SESSION_KEY } from "../lib/session-utils";
import { getAuthenticatedUser } from "../lib/users/users";

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
  return withSession(request.headers.get("Cookie"))(async session => {
    const user = await getAuthenticatedUser(session);
    if (!user) {
      // TODO manage callback to settings after login
      return redirect("/login");
    }

    return json({});
  });
};

export const action: ActionFunction = function action({ request }) {
  return withSession(request.headers.get("Cookie"))(async session => {
    const requestBody = new URLSearchParams(await request.text());

    const title = requestBody.get("title");
    const description = requestBody.get("description");
    const body = requestBody.get("body");
    const tags = requestBody.get("tagList");

    const tagList = tags ? tags.split(",").map(t => t.trim()) : [];

    try {
      const result = await createArticle(
        session.get(AUTH_TOKEN_SESSION_KEY),
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
  });
};
