export type Primitive = string | number | boolean | null | undefined;
export type JsonObject = Record<string, unknown>;
export type ParamRecord = Record<string, Primitive | Primitive[]>;

export interface DataifyClientOptions {
  apiKey?: string;
  scraperBaseUrl?: string;
  webUnlockerBaseUrl?: string;
  aiWebBaseUrl?: string;
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

export type ScraperTaskStatus = "处理中" | "成功" | "失败";

export type ScraperDownloadType = "json" | "csv" | "xlsx";

export interface TaskStatusResponse {
  data: {
    task_id: string;
    status: ScraperTaskStatus;
  };
  code: 200;
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

export type AIWebOperation = "search" | "map" | "extract";

export type AIWebFormat = "markdown" | "raw_html" | "clean_html" | "links";

export type AIWebSearchSource = "web" | "news" | "shopping" | "scholar";

export type AIWebTimeRange = "hour" | "day" | "week" | "month" | "year";

export type AIWebDomainFilter = "domain" | "all";

export type AIWebSitemapMode = "skip" | "include" | "only";

export type AIWebOutput = unknown[] | Record<string, unknown> | null;

export interface AIWebExtractOptions {
  formats?: AIWebFormat[];
  only_main_content?: boolean;
  include_tags?: string[];
  exclude_tags?: string[];
  max_age_ms?: number;
  timeout_ms?: number;
  wait_for_ms?: number;
  advanced_mode?: boolean;
  [key: string]: unknown;
}

export interface AIWebBaseRequest {
  unique_id: string;
  [key: string]: unknown;
}

export interface AIWebSearchRequest extends AIWebBaseRequest {
  query: string;
  max_results?: number;
  source?: AIWebSearchSource;
  country?: string;
  language?: string;
  time_range?: AIWebTimeRange;
  extract_content?: boolean;
  extract_options?: AIWebExtractOptions;
}

export interface AIWebMapRequest extends AIWebBaseRequest {
  url: string;
  country?: string;
  domain_filter?: AIWebDomainFilter;
  limit?: number;
  sitemap?: AIWebSitemapMode;
}

export interface AIWebExtractRequest extends AIWebBaseRequest {
  url: string;
  formats?: AIWebFormat[];
  only_main_content?: boolean;
  include_tags?: string[];
  exclude_tags?: string[];
  headers?: Record<string, string>;
  max_age_ms?: number;
  timeout_ms?: number;
  wait_for_ms?: number;
  country?: string;
  advanced_mode?: boolean;
}

export type AIWebRequest = AIWebSearchRequest | AIWebMapRequest | AIWebExtractRequest;

export interface AIWebResponse<T = unknown[]> {
  request_id: string | null;
  outputs: T;
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
