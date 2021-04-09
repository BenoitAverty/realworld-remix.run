// FIX for https://github.com/remix-run/discuss/issues/94 (we're copying the entire @remix/run/architect index file to be able to change it)

// Copyright © 2021 React Training LLC. All rights reserved.
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
require("@remix-run/architect/globals.js");
const url = require("url");
const node = require("@remix-run/node");

/**
 * A function that returns the value to use as `context` in route `loader` and
 * `action` functions.
 *
 * You can think of this as an escape hatch that allows you to pass
 * environment/platform-specific values through to your loader/action.
 */

/**
 * Returns a request handler for Architect that serves the response using
 * Remix.
 */
function createRequestHandler({ build, getLoadContext, mode = process.env.NODE_ENV }) {
  const handleRequest = node.createRequestHandler(build, mode);
  return async req => {
    const request = createRemixRequest(req);
    const loadContext = typeof getLoadContext === "function" ? getLoadContext(req) : undefined;
    const response = await handleRequest(request, loadContext);
    return {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers),
      body: await response.text(),
    };
  };
}

function createRemixRequest(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const search = req.rawQueryString.length ? "?" + req.rawQueryString : "";
  const url$1 = new url.URL(req.rawPath + search, `https://${host}`);
  return new node.Request(url$1.toString(), {
    method: req.requestContext.http.method,
    headers: req.cookies ? { ...req.headers, Cookie: req.cookies.join(";") } : req.headers,
    body: req.body && req.isBase64Encoded ? Buffer.from(req.body, "base64").toString() : req.body,
  });
}

exports.handler = createRequestHandler({
  build: require("./build"),
  // Saving the raw request (needed to access architect session)
  getLoadContext: req => ({ arcRequest: req }),
});
