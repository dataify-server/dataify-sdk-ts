import { runtimePostForm } from "../http.js";
import type { DataifyClient } from "../client.js";
import type { ParamRecord, SerpRunOptions } from "../types.js";

export class SerpService {
  constructor(private readonly client: DataifyClient) {}

  runSerpTool<T = unknown>(engine: string, params: ParamRecord = {}): Promise<T> {
    const cleaned = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));
    return runtimePostForm<T>(this.client, this.client.scraperBaseUrl, "/request", {
      engine,
      isjson: "1",
      json: params.json ?? "2",
      ...cleaned,
    });
  }

  run<T = unknown>(options: SerpRunOptions): Promise<T> {
    return this.runSerpTool<T>(options.engine, options.params ?? {});
  }
}
