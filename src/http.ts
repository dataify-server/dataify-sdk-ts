import { DataifyApiError, DataifyMissingTokenError } from "./errors.js";
import type { JsonObject, ParamRecord, Primitive } from "./types.js";

export interface HttpRuntime {
  readonly apiKey: string;
  readonly scraperBaseUrl: string;
  readonly webUnlockerBaseUrl: string;
  readonly timeoutMs: number;
  readonly fetchImpl: typeof fetch;
}

export async function runtimePostForm<T>(
  runtime: HttpRuntime,
  baseUrl: string,
  path: string,
  body?: ParamRecord,
): Promise<T> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  return rawRequest<T>(runtime, baseUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: bearer(runtime.apiKey),
    },
    body: toSearchParams(body),
  });
}

export async function runtimePostJson<T>(
  runtime: HttpRuntime,
  baseUrl: string,
  path: string,
  body?: JsonObject,
): Promise<T> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  return rawRequest<T>(runtime, baseUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer(runtime.apiKey),
    },
    body: JSON.stringify(body ?? {}),
  });
}

export async function runtimePostFormData<T>(
  runtime: HttpRuntime,
  baseUrl: string,
  path: string,
  body: FormData,
): Promise<T> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  return rawRequest<T>(runtime, baseUrl + path, {
    method: "POST",
    headers: { Authorization: bearer(runtime.apiKey) },
    body,
  });
}

export async function runtimeGet<T>(runtime: HttpRuntime, url: string): Promise<T> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  return rawRequest<T>(runtime, url, { method: "GET" });
}

export async function runtimeGetResponse(runtime: HttpRuntime, url: string): Promise<Response> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), runtime.timeoutMs);
  try {
    const res = await runtime.fetchImpl(url, { method: "GET", signal: controller.signal });
    if (!res.ok) throw new DataifyApiError(res.status, await res.text());
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function rawRequest<T>(runtime: HttpRuntime, url: string, init: RequestInit): Promise<T> {
  const text = await fetchText(runtime, url, init);
  return parseJson<T>(text);
}

async function fetchText(runtime: HttpRuntime, url: string, init: RequestInit): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), runtime.timeoutMs);
  try {
    const res = await runtime.fetchImpl(url, { ...init, signal: controller.signal });
    const text = await res.text();
    if (!res.ok) throw new DataifyApiError(res.status, text);
    return text;
  } finally {
    clearTimeout(timer);
  }
}

function parseJson<T>(text: string): T {
  if (!text.trim()) return undefined as T;
  return JSON.parse(text) as T;
}

function toSearchParams(body?: ParamRecord | Record<string, Primitive>): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(body ?? {})) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) params.append(key, String(item));
      }
    } else {
      params.set(key, String(value));
    }
  }
  return params;
}

function bearer(token: string): string {
  return token.toLowerCase().startsWith("bearer ") ? token : `Bearer ${token}`;
}