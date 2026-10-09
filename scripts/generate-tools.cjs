const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "scripts", "tools.source.json");
const outDir = path.join(root, "src", "generated");
const docPath = path.join(root, "docs", "TOOLS.zh-CN.md");

function main() {
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const scrapers = (source.scrapers ?? []).map((spec) => toEntry("scraper", spec));
  const serps = (source.serps ?? []).map((spec) => toEntry("serp", spec));
  validate([...scrapers, ...serps]);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "specs.ts"), renderSpecs(scrapers, serps), "utf8");
  fs.writeFileSync(path.join(outDir, "tools.ts"), renderTools(scrapers, serps), "utf8");
  fs.writeFileSync(docPath, renderDoc(fs.readFileSync(docPath, "utf8"), scrapers, serps), "utf8");

  console.log(JSON.stringify({
    scraper: scrapers.length,
    serp: serps.length,
    total: scrapers.length + serps.length,
  }, null, 2));
}

function toEntry(kind, spec) {
  return { kind, methodName: toCamelCase(spec.id), ...spec };
}

function validate(entries) {
  const seen = new Map();
  for (const entry of entries) {
    if (!entry.id) throw new Error(`Tool entry is missing an id: ${JSON.stringify(entry)}`);
    if (!entry.displayName) throw new Error(`Tool ${entry.id} is missing displayName`);
    if (!entry.product) throw new Error(`Tool ${entry.id} is missing product`);
    if (!entry.methodName) throw new Error(`Tool ${entry.id} produced an empty methodName`);
    if (seen.has(entry.methodName)) {
      throw new Error(`Duplicate methodName ${entry.methodName} for ids ${seen.get(entry.methodName)} and ${entry.id}`);
    }
    seen.set(entry.methodName, entry.id);
  }
}

function toCamelCase(id) {
  return id
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, ch) => ch.toUpperCase())
    .replace(/^[A-Z]/, (ch) => ch.toLowerCase());
}

function q(value) {
  return JSON.stringify(value);
}

function renderSpecs(scraperRows, serpRows) {
  const entries = [...scraperRows, ...serpRows].map((spec) => {
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

function renderDoc(doc, scraperRows, serpRows) {
  let lines = doc.split(/\r?\n/);
  lines = replaceStat(lines, "Scraper 工具", scraperRows.length);
  lines = replaceStat(lines, "SERP 工具", serpRows.length);
  lines = replaceStat(lines, "SDK 工具方法合计", scraperRows.length + serpRows.length);
  lines = replaceTable(lines, "## Scraper 工具", renderScraperTable(scraperRows));
  lines = replaceTable(lines, "## SERP 工具", renderSerpTable(serpRows));
  return lines.join("\n");
}

function replaceStat(lines, label, value) {
  const prefix = `| ${label} | `;
  return lines.map((line) => (line.startsWith(prefix) && line.endsWith(" |")
    ? `${prefix}${value} |`
    : line));
}

function replaceTable(lines, heading, tableLines) {
  const headingIndex = lines.indexOf(heading);
  if (headingIndex < 0) throw new Error(`Doc heading not found: ${heading}`);
  let start = headingIndex + 1;
  while (start < lines.length && !lines[start].startsWith("|")) start += 1;
  if (start >= lines.length) throw new Error(`Doc table not found after: ${heading}`);
  let end = start;
  while (end < lines.length && lines[end].startsWith("|")) end += 1;
  const next = lines.slice();
  next.splice(start, end - start, ...tableLines);
  return next;
}

function renderScraperTable(rows) {
  const lines = [
    "| # | SDK 方法 | spider_id | 产品 | spider_name | 参数 |",
    "|---:|---|---|---|---|---|",
  ];
  rows.forEach((spec, index) => {
    const spiderName = spec.spiderName ? `\`${spec.spiderName}\`` : "-";
    const params = (spec.params ?? []).join(", ") || "-";
    lines.push(`| ${index + 1} | \`${spec.methodName}\` | \`${spec.id}\` | ${spec.product} | ${spiderName} | ${params} |`);
  });
  return lines;
}

function renderSerpTable(rows) {
  const lines = [
    "| # | SDK 方法 | engine | 产品 | 参数 | 备注 |",
    "|---:|---|---|---|---|---|",
  ];
  rows.forEach((spec, index) => {
    const params = (spec.params ?? []).join(", ") || "-";
    const notes = spec.notes || "-";
    lines.push(`| ${index + 1} | \`${spec.methodName}\` | \`${spec.id}\` | ${spec.product} | ${params} | ${notes} |`);
  });
  return lines;
}

main();
