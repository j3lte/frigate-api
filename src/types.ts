/**
 * The service to get the logs for
 */
export type LogsService = "frigate" | "nginx" | "go2rtc";

/**
 * The return type for the logs endpoint
 */
export type LogsServiceReturn = {
  /** The total number of lines in the log */
  totalLines: number;
  /** The lines in the log */
  lines: string[];
};
