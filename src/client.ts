import { ScraperService } from "./services/scraper.js";
import { SerpService } from "./services/serp.js";
import { WebUnlockerService } from "./services/web-unlocker.js";
import { GeneratedToolsService } from "./generated/tools.js";
import type { DataifyClientOptions } from "./types.js";

type RuntimeProcess = {
  env?: Record<string, string | undefined>;
  emitWarning?: (warning: string) => void;
};

const warnedLegacyTokenEnvironments = new Set<string>();

export class DataifyClient {
  apiKey: string;
  readonly scraperBaseUrl: string;
  readonly webUnlockerBaseUrl: string;
  readonly timeoutMs: number;
  readonly fetchImpl: typeof fetch;

  readonly scraper: ScraperService;
  readonly serp: SerpService;
  readonly webUnlocker: WebUnlockerService;
  readonly tools: GeneratedToolsService;

  constructor(options: DataifyClientOptions = {}) {
    this.apiKey = resolveApiKey(options.apiKey);
    this.scraperBaseUrl = trimBaseUrl(options.scraperBaseUrl ?? "https://scraperapi.dataify.com");
    this.webUnlockerBaseUrl = trimBaseUrl(options.webUnlockerBaseUrl ?? "https://webunlocker.dataify.com");
    this.timeoutMs = options.timeoutMs ?? 120_000;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
    if (!this.fetchImpl) {
      throw new Error("A fetch implementation is required. Use Node.js >= 18 or pass fetchImpl.");
    }

    this.scraper = new ScraperService(this);
    this.serp = new SerpService(this);
    this.webUnlocker = new WebUnlockerService(this);
    this.tools = new GeneratedToolsService(this);
  }

  setApiKey(apiKey: string): this {
    this.apiKey = apiKey.trim();
    return this;
  }
}

function trimBaseUrl(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "");
}

function resolveApiKey(explicitApiKey?: string): string {
  const runtimeProcess = (globalThis as typeof globalThis & { process?: RuntimeProcess }).process;
  const environment = runtimeProcess?.env;
  const explicitToken = normalizeApiKey(explicitApiKey);
  if (explicitToken) {
    warnIfLegacyEnvironmentToken(explicitToken, runtimeProcess);
    return explicitToken;
  }
  const standardToken = normalizeApiKey(environment?.DATAIFY_API_TOKEN);
  if (standardToken) {
    return standardToken;
  }
  const legacyToken = normalizeApiKey(environment?.DATAIFY_TOKEN);
  if (legacyToken) {
    warnForLegacyEnvironment("DATAIFY_TOKEN", runtimeProcess);
    return legacyToken;
  }
  const legacyApiKey = normalizeApiKey(environment?.DATAIFY_API_KEY);
  if (legacyApiKey) {
    warnForLegacyEnvironment("DATAIFY_API_KEY", runtimeProcess);
    return legacyApiKey;
  }
  return "";
}

function normalizeApiKey(value?: string): string {
  return value?.trim() ?? "";
}

function warnIfLegacyEnvironmentToken(token: string, runtimeProcess?: RuntimeProcess): void {
  const environment = runtimeProcess?.env;
  if (token === normalizeApiKey(environment?.DATAIFY_TOKEN)) {
    warnForLegacyEnvironment("DATAIFY_TOKEN", runtimeProcess);
    return;
  }
  if (token === normalizeApiKey(environment?.DATAIFY_API_KEY)) {
    warnForLegacyEnvironment("DATAIFY_API_KEY", runtimeProcess);
  }
}

function warnForLegacyEnvironment(name: "DATAIFY_TOKEN" | "DATAIFY_API_KEY", runtimeProcess?: RuntimeProcess): void {
  if (warnedLegacyTokenEnvironments.has(name)) {
    return;
  }
  warnedLegacyTokenEnvironments.add(name);
  runtimeProcess?.emitWarning?.(`dataify: ${name} 已兼容读取，建议迁移至 DATAIFY_API_TOKEN。`);
}
