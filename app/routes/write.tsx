import React, { FC } from "react";
import EditorLayout from "../components/editor/EditorLayout";
import EditorForm from "../components/editor/EditorForm";
import { Action, Loader, useRouteData } from "@remix-run/react";
import { withSession } from "../lib/request-utils";
import { json, redirect } from "@remix-run/node";
import { createArticle, EditorFormErrors, isError } from "../lib/article/editor";
import { AUTH_TOKEN_SESSION_KEY } from "../lib/session-utils";
import { getAuthenticatedUser } from "../lib/users/users";

const WriteRoute: FC = function WriteRoute() {
  const { errors } = useRouteData<EditorFormErrors>();
  return (
    <EditorLayout>
      <EditorForm errors={errors} />
    </EditorLayout>
  );
};

export default WriteRoute;

export const loader: Loader = async function loader({ request }) {
  return withSession(request.headers.get("Cookie"))(async session => {
    const user = await getAuthenticatedUser(session);
    if (!user) {
      // TODO manage callback to settings after login
      return redirect("/login");
    }

    const failedNewArticle = session.get("failedNewArticle");
    if (failedNewArticle) {
      return json({ errors: JSON.parse(failedNewArticle).errors });
    }

    return json({});
  });
};

export const action: Action = function action({ request }) {
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
        session.flash("failedNewArticle", JSON.stringify(result));
        return redirect("/write");
      }
      return redirect(`/article/${result.article.slug}`);
    } catch (e) {
      session.flash("failedNewArticle", JSON.stringify({ errors: { global: [e.message] } }));
      return redirect("/write");
    }
  });
};
