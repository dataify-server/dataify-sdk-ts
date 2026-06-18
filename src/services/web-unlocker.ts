import { runtimePostJson } from "../http.js";
import type { DataifyClient } from "../client.js";
import type { WebUnlockerRequest } from "../types.js";

export class WebUnlockerService {
  constructor(private readonly client: DataifyClient) {}

  request<T = unknown>(params: WebUnlockerRequest): Promise<T> {
    return runtimePostJson<T>(this.client, this.client.webUnlockerBaseUrl, "/request", normalizeWebUnlockerRequest(params));
  }
}

function normalizeWebUnlockerRequest(params: WebUnlockerRequest): Record<string, unknown> {
  const result: Record<string, unknown> = { ...params };
  if (typeof result.js_render === "boolean") result.js_render = result.js_render ? "True" : "False";
  if (typeof result.follow_redirect === "boolean") result.follow_redirect = result.follow_redirect ? "True" : "False";
  if (typeof result.headers === "object" && result.headers !== null) result.headers = JSON.stringify(result.headers);
  if (typeof result.cookies === "object" && result.cookies !== null) result.cookies = JSON.stringify(result.cookies);
  result.isjson ??= "1";
  return result;
}
