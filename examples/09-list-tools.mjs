import { loadDataifySdk } from "./_load-sdk.mjs";

const { TOOL_SPECS } = await loadDataifySdk();
const specs = Object.values(TOOL_SPECS);
const scrapers = specs.filter((item) => item.kind === "scraper");
const serps = specs.filter((item) => item.kind === "serp");

console.log(`total tools: ${specs.length}`);
console.log(`scraper tools: ${scrapers.length}`);
console.log(`serp tools: ${serps.length}`);

console.log("\nFirst 20 tools:");
for (const item of specs.slice(0, 20)) {
  console.log(`${item.methodName} -> ${item.kind} -> ${item.id}`);
}