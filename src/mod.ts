import { createRawFrigateClient } from "./client.ts";
import type { paths } from "./frigate-api.d.ts";
import { LogsService, LogsServiceReturn } from "./types.ts";

class FrigateClient {
  private _client: ReturnType<typeof createRawFrigateClient>;

  constructor(baseURL: string) {
    this._client = createRawFrigateClient(baseURL);
  }

  /**
   * Get the raw client
   * @returns The raw client
   */
  get client() {
    return this._client;
  }

  /**
   * Do a GET request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get get() {
    return this._client.GET;
  }

  /**
   * Do a POST request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get post() {
    return this._client.POST;
  }

  /**
   * Do a DELETE request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get delete() {
    return this._client.DELETE;
  }

  /**
   * Do a PUT request
   * @param path - The path to request
   * @param options - The options to pass to the request
   * @returns The response
   */
  get put() {
    return this._client.PUT;
  }

  /**
   * Check if the Frigate instance is healthy
   * @returns True if the Frigate instance is healthy, false otherwise
   */
  async isHealthy() {
    const response = await this.get("/", { parseAs: "text" });
    return response.data === "Frigate is running. Alive and healthy!";
  }

  /**
   * Get the version of the Frigate instance
   * @returns The version of the Frigate instance
   */
  async version() {
    const response = await this.get("/version", { parseAs: "text" });
    return response.data;
  }

  /**
   * Get the config of the Frigate instance
   * @returns The config of the Frigate instance
   */
  async config() {
    const response = await this.get("/config");
    return response.data;
  }

  /**
   * Get the raw config (yaml) of the Frigate instance
   * @returns The raw config of the Frigate instance
   */
  async configRaw() {
    const response = await this.get("/config/raw", { parseAs: "text" });
    return response.data;
  }

  /**
   * Get the config schema of the Frigate instance
   * @returns The config schema of the Frigate instance
   */
  async configSchema() {
    const response = await this.get("/config/schema.json");
    return response.data;
  }

  /**
   * Get the stats of the Frigate instance
   * @returns The stats of the Frigate instance
   */
  async stats() {
    const response = await this.get("/stats");
    return response.data;
  }

  /**
   * Get the stats history of the Frigate instance
   * @returns The stats history of the Frigate instance
   */
  async statsHistory(query: { keys?: string } = {}) {
    const response = await this.get("/stats/history", { query });
    return response.data;
  }

  /**
   * Get the timeline of the Frigate instance
   * @returns The timeline of the Frigate instance
   */
  async timeline(
    query: { camera?: string; limit?: number; source_id?: string } = {},
  ) {
    const response = await this.get("/timeline", { query });
    return response.data;
  }

  /**
   * Get the logs of the Frigate instance
   * @param service - The service to get the logs for
   * @returns The logs of the Frigate instance
   */
  async logs(service: LogsService = "frigate") {
    // @ts-ignore It doesn't seem to understand the log paths
    const response = await this.get(`/logs/${service}`);
    return response.data as unknown as LogsServiceReturn;
  }
}

export { FrigateClient, type paths };
