import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadDataifySdk } from "../_load-sdk.mjs";
import { buildDefaultParams } from "./default-params.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsRoot = path.resolve(__dirname, "..", "results");

const args = parseArgs(process.argv.slice(2));
const live = Boolean(args.live);
const dryRun = !live;
const delayMs = Number(args["delay-ms"] ?? (live ? 1000 : 0));
const limit = args.limit ? Number(args.limit) : undefined;
const start = args.start ? Number(args.start) : 0;
const only = args.only ? new Set(String(args.only).split(",").map((item) => item.trim()).filter(Boolean)) : undefined;
const kind = args.kind ? String(args.kind) : undefined;
const stopOnError = Boolean(args["stop-on-error"]);
const tag = args.tag ? String(args.tag) : new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(resultsRoot, tag);
const warnedLegacyTokenEnvironments = new Set();

const { DataifyClient, TOOL_SPECS } = await loadDataifySdk();
const apiKey = live ? requireApiKey() : "TEST_API_KEY";
const calls = [];

const fetchImpl = dryRun
  ? async (url, init = {}) => {
      const call = {
        url: String(url),
        method: init.method,
        headers: init.headers,
        bodyType: init.body?.constructor?.name,
        body: init.body?.toString?.(),
      };
      calls.push(call);
      return new Response(JSON.stringify({ ok: true, mocked: true, call }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
  : undefined;

const client = new DataifyClient(fetchImpl ? { apiKey, fetchImpl } : { apiKey });
let specs = Object.values(TOOL_SPECS);
if (kind) specs = specs.filter((spec) => spec.kind === kind);
if (only) specs = specs.filter((spec) => only.has(spec.methodName) || only.has(spec.id));
specs = specs.slice(start, limit ? start + limit : undefined);

await fs.mkdir(outDir, { recursive: true });

const summary = [];
console.log(`mode: ${live ? "live" : "dry-run"}`);
console.log(`tools: ${specs.length}`);
console.log(`out: ${outDir}`);

for (let index = 0; index < specs.length; index += 1) {
  const spec = specs[index];
  const params = buildDefaultParams(spec);
  const started = Date.now();
  const record = {
    index: start + index + 1,
    methodName: spec.methodName,
    kind: spec.kind,
    id: spec.id,
    status: "pending",
    durationMs: 0,
    params,
  };

  process.stdout.write(`[${index + 1}/${specs.length}] ${spec.methodName} ... `);
  try {
    if (typeof client.tools[spec.methodName] !== "function") {
      throw new Error(`Missing generated method: ${spec.methodName}`);
    }
    const result = await client.tools[spec.methodName](params);
    record.status = "success";
    record.responseFile = `${spec.methodName}.json`;
    await fs.writeFile(path.join(outDir, record.responseFile), stringify(result), "utf8");
    console.log("success");
  } catch (error) {
    record.status = "failed";
    record.error = error?.stack || error?.message || String(error);
    console.log("failed");
    if (stopOnError) {
      summary.push(finishRecord(record, started));
      break;
    }
  }

  summary.push(finishRecord(record, started));
  await fs.writeFile(path.join(outDir, "summary.json"), stringify(summary), "utf8");
  await fs.writeFile(path.join(outDir, "summary.csv"), toCsv(summary), "utf8");
  if (delayMs > 0 && index < specs.length - 1) await sleep(delayMs);
}

if (dryRun) {
  await fs.writeFile(path.join(outDir, "dry-run-calls.json"), stringify(calls), "utf8");
}

const success = summary.filter((item) => item.status === "success").length;
const failed = summary.filter((item) => item.status === "failed").length;
console.log(`done. success=${success}, failed=${failed}`);
console.log(`summary: ${path.join(outDir, "summary.json")}`);
console.log(`csv: ${path.join(outDir, "summary.csv")}`);

function parseArgs(argv) {
  const result = {};
  for (const arg of argv) {
    if (arg.startsWith("--") && arg.includes("=")) {
      const [key, ...rest] = arg.slice(2).split("=");
      result[key] = rest.join("=");
    } else if (arg.startsWith("--")) {
      result[arg.slice(2)] = true;
    }
  }
  return result;
}

function requireApiKey() {
  const standardToken = process.env.DATAIFY_API_TOKEN?.trim();
  const legacyToken = process.env.DATAIFY_TOKEN?.trim();
  const legacyApiKey = process.env.DATAIFY_API_KEY?.trim();
  const value = standardToken || legacyToken || legacyApiKey;
  if (!value) {
    console.error("Missing Dataify API token. Set DATAIFY_API_TOKEN.");
    console.error("CMD: set \"DATAIFY_API_TOKEN=your_api_token\"");
    console.error("Legacy compatibility: DATAIFY_TOKEN, DATAIFY_API_KEY.");
    process.exit(1);
  }
  if (!standardToken && legacyToken) {
    warnForLegacyEnvironment("DATAIFY_TOKEN");
  } else if (!standardToken && legacyApiKey) {
    warnForLegacyEnvironment("DATAIFY_API_KEY");
  }
  return value;
}

function warnForLegacyEnvironment(name) {
  if (warnedLegacyTokenEnvironments.has(name)) return;
  warnedLegacyTokenEnvironments.add(name);
  console.warn(`dataify: ${name} 已兼容读取，建议迁移至 DATAIFY_API_TOKEN。`);
}

function finishRecord(record, started) {
  return { ...record, durationMs: Date.now() - started };
}

function stringify(value) {
  return JSON.stringify(value, null, 2);
}

function toCsv(rows) {
  const header = ["index", "methodName", "kind", "id", "status", "durationMs", "responseFile", "error"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(header.map((key) => csvCell(row[key] ?? "")).join(","));
  }
  return lines.join("\n") + "\n";
}

function csvCell(value) {
  const text = String(value).replace(/\r?\n/g, " ");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
