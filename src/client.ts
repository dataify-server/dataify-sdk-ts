import { ScraperService } from "./services/scraper.js";
import { SerpService } from "./services/serp.js";
import { WebUnlockerService } from "./services/web-unlocker.js";
import { GeneratedToolsService } from "./generated/tools.js";
import type { DataifyClientOptions } from "./types.js";

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
    this.apiKey = options.apiKey?.trim() ?? "";
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