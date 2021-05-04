require("@remix-run/react");
require("@remix-run/node");
const { createRequestHandler } = require("@remix-run/architect");
exports.handler = createRequestHandler({
  build: require("./build"),
});
