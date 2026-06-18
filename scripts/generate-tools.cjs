const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const toolsDoc = path.join(root, "docs", "TOOLS.zh-CN.md");
const outDir = path.join(root, "src", "generated");

function main() {
  const doc = fs.readFileSync(toolsDoc, "utf8");
  const scraperRows = parseSection(doc, "## Scraper 执行工具").map(parseScraperRow).filter(Boolean);
  const serpRows = parseSection(doc, "## SERP 执行工具").map(parseSerpRow).filter(Boolean);

  if (!serpRows.some((row) => row.id === "yandex")) {
    serpRows.push({
      kind: "serp",
      methodName: "yandex",
      id: "yandex",
      displayName: "Yandex搜索",
      product: "Yandex搜索引擎API",
      productSign: "facebook_event_by-events-url",
      crawlerId: undefined,
      params: [],
      notes: "官网 getScraperList 返回 Yandex 产品，但 getSerpDetail 当前返回空；SDK 暂按 engine=yandex 生成便捷方法，调用前需后端确认该 engine 可用。",
    });
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "specs.ts"), renderSpecs(scraperRows, serpRows), "utf8");
  fs.writeFileSync(path.join(outDir, "tools.ts"), renderTools(scraperRows, serpRows), "utf8");

  console.log(JSON.stringify({
    scraper: scraperRows.length,
    serp: serpRows.length,
    total: scraperRows.length + serpRows.length,
  }, null, 2));
}

function parseSection(doc, heading) {
  const start = doc.indexOf(heading);
  if (start < 0) return [];
  const next = doc.indexOf("\n## ", start + heading.length);
  const section = doc.slice(start, next < 0 ? doc.length : next);
  return section.split(/\r?\n/).filter((line) => /^\| \d+ \|/.test(line));
}

function splitRow(line) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim().replace(/^`|`$/g, ""));
}

function parseParams(value) {
  if (!value || value === "``") return [];
  return value
    .replace(/^`|`$/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseScraperRow(line) {
  const cells = splitRow(line);
  if (cells.length < 8) return null;
  const id = cells[1];
  const product = cells[3];
  return {
    kind: "scraper",
    methodName: toCamelCase(id),
    id,
    displayName: cells[2],
    product,
    group: cells[4],
    productSign: "",
    spiderName: defaultSpiderName(product),
    toolId: toNumber(cells[5]),
    params: parseParams(cells[6]),
    required: parseParams(cells[7]),
  };
}

function parseSerpRow(line) {
  const cells = splitRow(line);
  if (cells.length < 6) return null;
  const id = cells[1];
  if (!id) return null;
  return {
    kind: "serp",
    methodName: toCamelCase(id),
    id,
    displayName: cells[2],
    product: cells[3],
    productSign: "",
    crawlerId: toNumber(cells[4]),
    params: parseParams(cells[5]),
  };
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function toCamelCase(id) {
  return id
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, ch) => ch.toUpperCase())
    .replace(/^[A-Z]/, (ch) => ch.toLowerCase());
}

function q(value) {
  return JSON.stringify(value);
}

function defaultSpiderName(product) {
  return ({
    Airbnb: "airbnb.com",
    Booking: "booking.com",
    Crunchbase: "crunchbase.com",
    eBay: "ebay.com",
    Facebook: "facebook.com",
    Github: "github.com",
    Glassdoor: "glassdoor.com",
    Google: "google.com",
    "Google Play Store": "play.google.com",
    Indeed: "indeed.com",
    Instagram: "instagram.com",
    Reddit: "reddit.com",
    Tiktok: "tiktok.com",
    Twitter: "x.com",
    Walmart: "walmart.com",
    YouTube: "youtube.com",
    Zillow: "zillow.com",
    "领英": "linkedin.com",
    "亚马逊": "amazon.com",
  })[product];
}

function renderSpecs(scraperRows, serpRows) {
  const all = [...scraperRows, ...serpRows];
  const entries = all.map((spec) => {
    const fields = [
      `kind: ${q(spec.kind)}`,
      `methodName: ${q(spec.methodName)}`,
      `id: ${q(spec.id)}`,
      `displayName: ${q(spec.displayName)}`,
      `product: ${q(spec.product)}`,
      `productSign: ${q(spec.productSign ?? "")}`,
      spec.spiderName ? `spiderName: ${q(spec.spiderName)}` : "",
      spec.group ? `group: ${q(spec.group)}` : "",
      spec.toolId != null ? `toolId: ${spec.toolId}` : "",
      spec.crawlerId != null ? `crawlerId: ${spec.crawlerId}` : "",
      `params: ${q(spec.params ?? [])}`,
      spec.required?.length ? `required: ${q(spec.required)}` : "",
      spec.notes ? `notes: ${q(spec.notes)}` : "",
    ].filter(Boolean);
    return `  ${spec.methodName}: { ${fields.join(", ")} }`;
  });
  return `import type { ToolSpec } from "../types.js";

export const TOOL_SPECS = {
${entries.join(",\n")}
} as const satisfies Record<string, ToolSpec>;

export type ToolMethodName = keyof typeof TOOL_SPECS;
`;
}

function renderTools(scraperRows, serpRows) {
  const methods = [];
  for (const spec of scraperRows) {
    const spiderNamePrefix = spec.spiderName ? `spiderName: ${q(spec.spiderName)}, ` : "";
    methods.push(`  ${spec.methodName}<T = unknown>(params: ParamRecord = {}, options: Omit<ScraperRunOptions, "spiderId" | "parameters"> = {}): Promise<T> {
    return this.client.scraper.runScraperTool<T>({ ${spiderNamePrefix}...options, spiderId: ${q(spec.id)}, parameters: params });
  }`);
  }
  for (const spec of serpRows) {
    const note = spec.notes ? `\n  /** ${spec.notes} */` : "";
    methods.push(`${note}
  ${spec.methodName}<T = unknown>(params: ParamRecord = {}): Promise<T> {
    return this.client.serp.runSerpTool<T>(${q(spec.id)}, params);
  }`);
  }
  return `import type { DataifyClient } from "../client.js";
import type { ParamRecord, ScraperRunOptions } from "../types.js";
import { TOOL_SPECS } from "./specs.js";

export class GeneratedToolsService {
  readonly specs = TOOL_SPECS;

  constructor(private readonly client: DataifyClient) {}

${methods.join("\n\n")}
}
`;
}

main();
