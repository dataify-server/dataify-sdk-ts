import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, requireEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const url = requireEnv("DATAIFY_TEST_AMAZON_URL", "set DATAIFY_TEST_AMAZON_URL=https://www.amazon.com/dp/REAL_ASIN");

const result = await client.tools.amazonProductByUrl({
  url,
  zip_code: "94107",
});

printSummary("Amazon product by URL result", result);