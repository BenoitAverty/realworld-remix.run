export const fetcher = (key: string) => fetch(key).then(r => r.json());
