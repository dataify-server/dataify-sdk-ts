import {
  DataifyApiError,
  DataifyConnectionError,
  DataifyMissingTokenError,
  DataifySdkError,
  DataifyTimeoutError,
} from "./errors.js";
import type { JsonObject, ParamRecord, Primitive } from "./types.js";

export interface HttpRuntime {
  readonly apiKey: string;
  readonly scraperBaseUrl: string;
  readonly webUnlockerBaseUrl: string;
  readonly timeoutMs: number;
  readonly fetchImpl: typeof fetch;
}

export interface JsonWithHeaders<T> {
  readonly data: T;
  readonly headers: Headers;
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

export async function runtimePostJsonWithHeaders<T>(
  runtime: HttpRuntime,
  baseUrl: string,
  path: string,
  body?: JsonObject,
): Promise<JsonWithHeaders<T>> {
  if (!runtime.apiKey) throw new DataifyMissingTokenError("apiKey");
  return rawRequestWithHeaders<T>(runtime, baseUrl + path, {
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
  return requestWithTransportTimeout(runtime, url, async (signal) => {
    const res = await runtime.fetchImpl(url, { method: "GET", signal });
    if (!res.ok) throw new DataifyApiError(res.status, await res.text());
    return res;
  });
}

async function rawRequest<T>(runtime: HttpRuntime, url: string, init: RequestInit): Promise<T> {
  return (await rawRequestWithHeaders<T>(runtime, url, init)).data;
}

async function rawRequestWithHeaders<T>(runtime: HttpRuntime, url: string, init: RequestInit): Promise<JsonWithHeaders<T>> {
  const { text, headers } = await fetchTextWithHeaders(runtime, url, init);
  return { data: parseJson<T>(text), headers };
}

async function fetchText(runtime: HttpRuntime, url: string, init: RequestInit): Promise<string> {
  return (await fetchTextWithHeaders(runtime, url, init)).text;
}

async function fetchTextWithHeaders(
  runtime: HttpRuntime,
  url: string,
  init: RequestInit,
): Promise<{ text: string; headers: Headers }> {
  return requestWithTransportTimeout(runtime, url, async (signal) => {
    const res = await runtime.fetchImpl(url, { ...init, signal });
    const text = await res.text();
    if (!res.ok) throw new DataifyApiError(res.status, text);
    return { text, headers: res.headers };
  });
}

async function requestWithTransportTimeout<T>(
  runtime: HttpRuntime,
  url: string,
  request: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, runtime.timeoutMs);
  try {
    return await request(controller.signal);
  } catch (error) {
    if (error instanceof DataifySdkError) throw error;
    if (timedOut || isAbortError(error)) {
      throw new DataifyTimeoutError(url, runtime.timeoutMs, error);
    }
    throw new DataifyConnectionError(url, error);
  } finally {
    clearTimeout(timer);
  }
}

function isAbortError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "name" in error &&
    (error as { name?: unknown }).name === "AbortError";
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
