export type Primitive = string | number | boolean | null | undefined;
export type JsonObject = Record<string, unknown>;
export type ParamRecord = Record<string, Primitive | Primitive[]>;

export interface DataifyClientOptions {
  apiKey?: string;
  scraperBaseUrl?: string;
  webUnlockerBaseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface ScraperRunOptions {
  spiderName?: string;
  spiderId: string;
  parameters?: ParamRecord | Array<Record<string, unknown>>;
  universal?: Record<string, unknown>;
  fileName?: string;
  spiderErrors?: boolean | string;
}

export interface SerpRunOptions {
  engine: string;
  params?: ParamRecord;
}

export interface WebUnlockerRequest {
  url: string;
  type?: string;
  js_render?: string | boolean;
  block_resources?: string;
  clean_content?: string;
  country?: string;
  headers?: string | Record<string, string>;
  cookies?: string | Record<string, string>;
  wait?: string | number;
  wait_for?: string;
  follow_redirect?: string | boolean;
  isjson?: string | number | boolean;
  [key: string]: unknown;
}

export interface ToolSpec {
  kind: "scraper" | "serp";
  methodName: string;
  id: string;
  displayName: string;
  product: string;
  productSign: string;
  spiderName?: string;
  group?: string;
  toolId?: number;
  crawlerId?: number;
  params: string[];
  required?: string[];
  notes?: string;
}