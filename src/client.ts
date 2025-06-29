import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "./frigate-api.d.ts";

const myMiddleware: Middleware = {
  onResponse({ response }) {
    if (!response.ok) {
      // Will produce error messages like "https://example.org/api/v1/example: 404 Not Found".
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`,
      );
    }

    return response;
  },
};

/**
 * Create a Frigate client
 * @param baseURL - The base URL of the Frigate instance
 * @returns A Frigate client
 */
export const createRawFrigateClient = (baseURL: string) => {
  const client = createClient<paths>({
    baseUrl: baseURL,
  });
  client.use(myMiddleware);
  return client;
};

export { paths };
