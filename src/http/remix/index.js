// FIX for https://github.com/remix-run/discuss/issues/94 (we're copying the entire @remix/run/architect index file to be able to change it)

// Copyright © 2021 React Training LLC. All rights reserved.
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const url = require("url");
const core = require("@remix-run/core");
require("@remix-run/architect/fetchGlobals.js");

function createRequestHandler({ build, getLoadContext, mode = process.env.NODE_ENV }) {
  const handleRequest = core.createRequestHandler(build, mode);
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
  return new core.Request(url$1.toString(), {
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
