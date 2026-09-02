import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const url = optionalEnv("DATAIFY_TEST_URL") || "https://example.com";

const result = await client.webUnlocker.request({
  url,
  type: "html",
  js_render: false,
});

printSummary("Web Unlocker result", result);