const fetch = require("node-fetch")

// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function handler (event, context) {
  console.debug('event received: ', event);
  console.debug('context received: ',context);

  // fetch Headers and ALB Headers are different types
  const apiUrl = "conduit.productionready.io";
  let customRequestHeader = {};
  if ( event.headers ) {
    customRequestHeader = event.headers;
  }
  customRequestHeader['host'] = apiUrl;
  customRequestHeader['proxyRequestId'] = context.awsRequestId || "";
  console.debug('request customHeader: ', customRequestHeader);

  // perform fetch to https target
  try {
    const url = `https://${apiUrl}${event.requestContext.http.path}`;
    const params = {
      method: event.requestContext.http.method,
      headers: customRequestHeader
    };

    console.debug('request params: ', params);
    const response = await fetch(url, params);
    const textResponse = await response.text();
    console.debug('response text: ', textResponse);

    // fetch Headers and ALB Headers are different types so code if you need Header manipulation on the response
    console.debug('response headers: ', response.headers);
    const customResponseHeader = { proxyRequestId: context.awsRequestId || "" } ;
    for (const pair of response.headers.entries()) {
      // Lose the encoding unfortunately
      if(pair[0].toLowerCase() !== "content-encoding") {
        customResponseHeader[pair[0]] = pair[1];
      }
    }
    console.debug('response customHeader: ', customResponseHeader);

    return {
      statusCode: response.status,
      statusDescription: response.statusText,
      isBase64Encoded: false,
      headers: customResponseHeader,
      body: textResponse
    };
  } catch (err) {
    console.error(`Unexpected 500 | ${err.message} | ${err.detail}`);
    return {
      statusCode: 502,
      statusDescription: 'Bad Gateway',
      isBase64Encoded: false,
      headers: event.headers,
      body: err.message
    };
  }
}