const apiUrl =
  process.env.API_URL || "https://stw74y7a42.execute-api.eu-west-1.amazonaws.com/dev/api";

export function fetchWithApiUrl() {
  return async function (uri: string, init?: RequestInit): Promise<Response> {
    return fetch(`${apiUrl}${uri}`, init);
  };
}

export function fetchWithToken(token: string) {
  const fetch = fetchWithApiUrl();

  return async function (uri: string, init: RequestInit = { headers: {} }): Promise<Response> {
    return fetch(uri, {
      ...init,
      headers: {
        Authorization: "Token " + token,
        ...init.headers,
      },
    });
  };
}
