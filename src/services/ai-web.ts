import { runtimePostJson, runtimePostJsonWithHeaders } from "../http.js";
import {
  DataifyMissingAIWebTaskIdError,
  DataifyUnsupportedAIWebOperationError,
} from "../errors.js";
import type { DataifyClient } from "../client.js";
import type {
  AIWebExtractRequest,
  AIWebMapRequest,
  AIWebOperation,
  AIWebOutput,
  AIWebRequest,
  AIWebResponse,
  AIWebSearchRequest,
} from "../types.js";

const aiWebPathByOperation: Record<AIWebOperation, string> = {
  search: "/search",
  map: "/map",
  extract: "/extract",
};

export const AI_WEB_UNIQUE_IDS = {
  searchWeb: "search_web",
  searchShopping: "search_shopping",
  searchNews: "search_news",
  searchScholar: "search_scholar",
  map: "map",
  extract: "extract",
} as const;

export class AIWebService {
  constructor(private readonly client: DataifyClient) {}

  search<T = unknown>(params: AIWebSearchRequest): Promise<AIWebResponse<T[]>> {
    return this.execute<T>("search", params);
  }

  map<T = unknown>(params: AIWebMapRequest): Promise<AIWebResponse<T[]>> {
    return this.execute<T>("map", params);
  }

  extract<T = unknown>(params: AIWebExtractRequest): Promise<AIWebResponse<T[]>> {
    return this.execute<T>("extract", params);
  }

  async execute<T = unknown>(operation: AIWebOperation, params: AIWebRequest): Promise<AIWebResponse<T[]>> {
    const response = await this.executeRaw<AIWebOutput>(operation, params);
    return {
      request_id: response.request_id,
      outputs: normalizeAIWebOutputs<T>(response.outputs),
    };
  }

  async executeRaw<T = AIWebOutput>(operation: AIWebOperation, params: AIWebRequest): Promise<AIWebResponse<T>> {
    const path = (aiWebPathByOperation as Record<string, string | undefined>)[operation];
    if (!path) {
      throw new DataifyUnsupportedAIWebOperationError(operation);
    }
    const response = await runtimePostJsonWithHeaders<T>(this.client, this.client.aiWebBaseUrl, path, params);
    return {
      request_id: normalizeRequestId(response.headers.get("X-Request-Id")),
      outputs: response.data,
    };
  }

  async downloadResult<T = AIWebOutput>(taskId: string): Promise<T> {
    return runtimePostJson<T>(this.client, this.client.aiWebBaseUrl, "/download", {
      task_id: normalizeAIWebTaskId(taskId),
    });
  }
}

export function normalizeAIWebOutputs<T = unknown>(outputs: unknown): T[] {
  if (outputs === null || outputs === undefined) return [];
  return Array.isArray(outputs) ? outputs as T[] : [outputs as T];
}

function normalizeRequestId(value: string | null): string | null {
  const requestId = value?.trim() ?? "";
  return requestId || null;
}

function normalizeAIWebTaskId(taskId: string): string {
  if (typeof taskId !== "string" || !taskId.trim()) {
    throw new DataifyMissingAIWebTaskIdError();
  }
  return taskId.trim();
}
