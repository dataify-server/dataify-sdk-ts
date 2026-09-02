import { runtimeGet, runtimeGetResponse, runtimePostFormData } from "../http.js";
import { DataifyMissingTokenError, DataifyUnsupportedDownloadTypeError } from "../errors.js";
import type { DataifyClient } from "../client.js";
import type { ParamRecord, ScraperDownloadType, ScraperRunOptions, TaskStatusResponse } from "../types.js";

export class ScraperService {
  constructor(private readonly client: DataifyClient) {}

  async runScraperTool<T = unknown>(options: ScraperRunOptions): Promise<T> {
    const form = new FormData();
    form.set("spider_name", options.spiderName ?? inferSpiderName(options.spiderId));
    form.set("spider_id", options.spiderId);
    form.set("spider_parameters", JSON.stringify(normalizeParameters(options.parameters ?? {})));
    if (options.universal && Object.keys(options.universal).length > 0) {
      form.set("spider_universal", JSON.stringify(options.universal));
    }
    form.set("spider_errors", String(options.spiderErrors ?? true));
    form.set("file_name", options.fileName ?? "{{TasksID}}");
    return runtimePostFormData<T>(this.client, this.client.scraperBaseUrl, "/builder?platform=1", form);
  }

  downloadTaskResult<T = unknown>(taskId: string): Promise<T> {
    return runtimeGet<T>(this.client, this.buildDownloadUrl(taskId, "json"));
  }

  async getTaskStatus(taskId: string): Promise<TaskStatusResponse> {
    return runtimeGet<TaskStatusResponse>(this.client, this.buildTaskStatusUrl(taskId));
  }

  downloadTaskFile(taskId: string, type: ScraperDownloadType = "json"): Promise<Response> {
    return runtimeGetResponse(this.client, this.buildDownloadUrl(taskId, type));
  }

  buildDownloadUrl(taskId: string, type: ScraperDownloadType = "json"): string {
    if (!this.client.apiKey) throw new DataifyMissingTokenError("apiKey");
    if (!isSupportedDownloadType(type)) throw new DataifyUnsupportedDownloadTypeError();
    const params = new URLSearchParams({
      api_key: this.client.apiKey,
      task_id: taskId.trim(),
      type,
    });
    return `${this.client.scraperBaseUrl}/download?${params.toString()}`;
  }

  buildTaskStatusUrl(taskId: string): string {
    if (!this.client.apiKey) throw new DataifyMissingTokenError("apiKey");
    const params = new URLSearchParams({
      api_key: this.client.apiKey,
      task_id: taskId.trim(),
    });
    return `${this.client.scraperBaseUrl}/task_status?${params.toString()}`;
  }
}

function isSupportedDownloadType(type: string): type is ScraperDownloadType {
  return type === "json" || type === "csv" || type === "xlsx";
}

function normalizeParameters(input: ParamRecord | Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  if (Array.isArray(input)) return input;
  return [Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== null))];
}

function inferSpiderName(spiderId: string): string {
  const first = spiderId.split(/[_-]/).find(Boolean);
  return first ?? spiderId;
}
