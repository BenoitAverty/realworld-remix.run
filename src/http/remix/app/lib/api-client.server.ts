export const apiUrl = process.env.API_URL || "https://conduit.productionready.io";

export function fetchWithApiUrl() {
  return async function (uri: string, init?: RequestInit): Promise<Response> {
    return fetch(`${apiUrl}/api${uri}`, init);
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
