import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });

const walmartKeyword = optionalEnv("DATAIFY_TEST_WALMART_KEYWORD") || "coffee";
const walmart = await client.tools.walmartProductByKeywords({
  keyword: walmartKeyword,
  page_turning: "1",
});
printSummary("Walmart product by keyword result", walmart);

const ebayKeyword = optionalEnv("DATAIFY_TEST_EBAY_KEYWORD") || "coffee";
const ebay = await client.tools.ebayEbayByKeywords({
  keywords: ebayKeyword,
  count: "5",
});
printSummary("eBay by keyword result", ebay);