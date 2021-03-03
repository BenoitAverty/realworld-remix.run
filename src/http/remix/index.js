// FIX for https://github.com/remix-run/discuss/issues/94

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const url = require("url");
const core = require("@remix-run/core");
require("@remix-run/architect/fetchGlobals.js");

const createRequestHandler = core.createAdapter({
  createRemixRequest(req) {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const search = req.rawQueryString.length ? "?" + req.rawQueryString : "";
    const url$1 = new url.URL(req.rawPath + search, `https://${host}`);
    return new core.Request(url$1.toString(), {
      method: req.requestContext.http.method,
      headers: req.cookies ? { ...req.headers, Cookie: req.cookies.join(";") } : req.headers,
      body: req.body && req.isBase64Encoded ? Buffer.from(req.body, "base64").toString() : req.body,
    });
  },

  async sendPlatformResponse(remixResponse) {
    return {
      statusCode: remixResponse.status,
      headers: Object.fromEntries(remixResponse.headers),
      body: await remixResponse.text(),
    };
  },
});

exports.handler = createRequestHandler();
