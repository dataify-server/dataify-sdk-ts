const warnedLegacyTokenEnvironments = new Set();

export function getApiKey() {
  const standardToken = process.env.DATAIFY_API_TOKEN?.trim();
  const legacyToken = process.env.DATAIFY_TOKEN?.trim();
  const legacyApiKey = process.env.DATAIFY_API_KEY?.trim();
  const apiKey = standardToken || legacyToken || legacyApiKey;
  if (!apiKey) {
    console.error("Missing Dataify API token. Set DATAIFY_API_TOKEN.");
    console.error("CMD:        set \"DATAIFY_API_TOKEN=your_api_token\"");
    console.error("PowerShell: $env:DATAIFY_API_TOKEN=\"your_api_token\"");
    console.error("Legacy compatibility: DATAIFY_TOKEN, DATAIFY_API_KEY.");
    process.exit(1);
  }
  if (!standardToken && legacyToken) {
    warnForLegacyEnvironment("DATAIFY_TOKEN");
  } else if (!standardToken && legacyApiKey) {
    warnForLegacyEnvironment("DATAIFY_API_KEY");
  }
  return apiKey;
}

function warnForLegacyEnvironment(name) {
  if (warnedLegacyTokenEnvironments.has(name)) return;
  warnedLegacyTokenEnvironments.add(name);
  console.warn(`dataify: ${name} 已兼容读取，建议迁移至 DATAIFY_API_TOKEN。`);
}

export function optionalEnv(name) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function requireEnv(name, example) {
  const value = optionalEnv(name);
  if (!value) {
    console.log(`SKIP: ${name} is not set.`);
    if (example) console.log(`Example: ${example}`);
    process.exit(0);
  }
  return value;
}

export function printSummary(label, value) {
  console.log(`\n=== ${label} ===`);
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    console.log("type: object");
    console.log(`keys: ${keys.slice(0, 20).join(", ") || "none"}`);
    console.log("raw:");
    console.log(JSON.stringify(value, null, 2));
    return;
  }
  console.log(value);
}
