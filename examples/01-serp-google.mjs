import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const q = optionalEnv("DATAIFY_TEST_QUERY") || "Dataify";

const result = await client.tools.google({
  q,
  json: "1",
});

printSummary("Google SERP result", result);