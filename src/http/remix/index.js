"use strict";

// TODO This is a fix of https://github.com/remix-run/discuss/issues/74. Once fixed; re-use the import from @remix-run/architect
Object.defineProperty(exports, "__esModule", { value: true });

const arc = require("@architect/functions");
const url = require("url");
const core = require("@remix-run/core");
require("@remix-run/architect/fetchGlobals.js");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

const arc__default = /* #__PURE__ */ _interopDefaultLegacy(arc);

const createRequestHandler = core.createAdapter({
  createRemixRequest(req) {
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const search = req.rawQueryString.length ? "?" + req.rawQueryString : "";
    const url$1 = new url.URL(req.rawPath + search, `https://${host}`);
    const body =
      req.isBase64Encoded && req.body ? new Buffer(req.body, "base64").toString() : req.body;
    return new core.Request(url$1.toString(), {
      method: req.requestContext.http.method,
      headers: req.headers,
      body: body,
    });
  },

  async sendPlatformResponse(remixResponse, remixSession) {
    // Don't write a cookie if the session object is empty. It always has
    // `iam` on it (that's why it's length > 1), need to look into this more,
    // docs don't talk about it.
    if (Object.keys(remixSession.mutableData).length > 1) {
      remixResponse.headers.append(
        "set-cookie",
        await arc__default.default.http.session.write(remixSession.mutableData),
      );
    }

    return {
      statusCode: remixResponse.status,
      headers: Object.fromEntries(remixResponse.headers),
      body: await remixResponse.text(),
    };
  },

  async createRemixSession(enableSessions, req) {
    if (enableSessions === false) {
      return core.createSessionFacade(
        "You need to enable sessions to use them. Enable with `createRequestHandler({ enableSessions: true })` in your Remix arc handler definition.",
      );
    }

    let arcSession = await arc__default.default.http.session.read(req);
    return core.createSession(arcSession, () => {
      // TODO: Make sure this works for a `logout` situation
      // Delete everything but `iam`, which they seem to keep around always, not
      // a lot of documentation here
      arcSession = {
        iam: arcSession.iam,
      };
    });
  },
});

exports.handler = createRequestHandler({ enableSessions: true });
