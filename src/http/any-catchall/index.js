const { createRequestHandler } = require("@remix-run/architect");
exports.handler = createRequestHandler({ session: true });
