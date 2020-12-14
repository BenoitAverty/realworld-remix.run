import { fetchWithApiUrl } from "../../../common/lib/api-client";

const fetch = fetchWithApiUrl();

export const fetcher = (key: string) => fetch(key).then(r => r.json());
