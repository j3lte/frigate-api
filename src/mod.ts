import { createRawFrigateClient } from "./client.ts";
import type { paths } from "./frigate-api.d.ts";
import type { LogsService, LogsServiceReturn } from "./types.ts";

/**
 * A Frigate client
 *
 * This client is a wrapper around the Frigate API.
 *
 * @see https://jsr.io/@j3lte/frigate-api/doc
 *
 * @example
 * ```typescript
 * const frigate = new FrigateClient("http://localhost:8000/api");
 * const version = await frigate.version();
 * console.log(version);
 * ```
 */
class FrigateClient {
  /**
   * The raw client
   */
  private _client: ReturnType<typeof createRawFrigateClient>;

  /**
   * Create a new Frigate client
   *
   * _Note: The apiURL should be the complete url to the API, not just the base URL_
   *
   * @param apiURL - The API URL of the Frigate instance
   */
  constructor(apiURL: string) {
    this._client = createRawFrigateClient(apiURL);
  }

  /**
   * Get the raw client
   * @returns The raw client
   */
  get client(): typeof this._client {
    return this._client;
  }

  /**
   * Do a GET request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get get(): typeof this._client.GET {
    return this._client.GET;
  }

  /**
   * Do a POST request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get post(): typeof this._client.POST {
    return this._client.POST;
  }

  /**
   * Do a DELETE request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get delete(): typeof this._client.DELETE {
    return this._client.DELETE;
  }

  /**
   * Do a PUT request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get put(): typeof this._client.PUT {
    return this._client.PUT;
  }

  /**
   * Do a OPTIONS request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get options(): typeof this._client.OPTIONS {
    return this._client.OPTIONS;
  }

  /**
   * Do a HEAD request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get head(): typeof this._client.HEAD {
    return this._client.HEAD;
  }

  /**
   * Do a PATCH request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get patch(): typeof this._client.PATCH {
    return this._client.PATCH;
  }

  /**
   * Do a TRACE request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get trace(): typeof this._client.TRACE {
    return this._client.TRACE;
  }

  /**
   * Check if the Frigate instance is healthy
   * @returns True if the Frigate instance is healthy, false otherwise
   */
  async isHealthy(): Promise<boolean> {
    const response = await this.get("/", { parseAs: "text" });
    return response.data === "Frigate is running. Alive and healthy!";
  }

  /**
   * Get the version of the Frigate instance
   * @returns The version of the Frigate instance
   */
  async version(): Promise<string> {
    const response = await this.get("/version", { parseAs: "text" });
    return response.data as string;
  }

  /**
   * Get the config of the Frigate instance
   * @returns The config of the Frigate instance
   */
  async config(): Promise<unknown> {
    const response = await this.get("/config");
    return response.data;
  }

  /**
   * Get the raw config (yaml) of the Frigate instance
   * @returns The raw config of the Frigate instance
   */
  async configRaw(): Promise<string> {
    const response = await this.get("/config/raw", { parseAs: "text" });
    return response.data as string;
  }

  /**
   * Get the config schema of the Frigate instance
   * @returns The config schema of the Frigate instance
   */
  async configSchema(): Promise<unknown> {
    const response = await this.get("/config/schema.json");
    return response.data;
  }

  /**
   * Get the stats of the Frigate instance
   * @returns The stats of the Frigate instance
   */
  async stats(): Promise<unknown> {
    const response = await this.get("/stats");
    return response.data;
  }

  /**
   * Get the stats history of the Frigate instance
   * @returns The stats history of the Frigate instance
   */
  async statsHistory(query: { keys?: string } = {}): Promise<unknown> {
    const response = await this.get("/stats/history", { query });
    return response.data;
  }

  /**
   * Get the timeline of the Frigate instance
   * @returns The timeline of the Frigate instance
   */
  async timeline(
    query: { camera?: string; limit?: number; source_id?: string } = {},
  ): Promise<unknown> {
    const response = await this.get("/timeline", { query });
    return response.data;
  }

  /**
   * Get the logs of the Frigate instance
   * @param service - The service to get the logs for
   * @returns The logs of the Frigate instance
   */
  async logs(service: LogsService = "frigate"): Promise<LogsServiceReturn> {
    // @ts-ignore It doesn't seem to understand the log paths
    const response = await this.get(`/logs/${service}`);
    return response.data as unknown as LogsServiceReturn;
  }
}

export { FrigateClient, type paths };
