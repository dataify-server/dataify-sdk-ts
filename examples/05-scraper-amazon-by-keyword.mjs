import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const keyword = optionalEnv("DATAIFY_TEST_KEYWORD") || "coffee";

const result = await client.tools.amazonProductByKeywords({
  keyword,
  page_turning: "1",
});

printSummary("Amazon product by keyword result", result);