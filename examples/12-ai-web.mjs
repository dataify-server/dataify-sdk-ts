import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { AI_WEB_UNIQUE_IDS, DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({
  apiKey: getApiKey(),
});

const query = optionalEnv("DATAIFY_TEST_QUERY") || "OpenAI";
const url = optionalEnv("DATAIFY_TEST_URL") || "https://example.com";

const search = await client.aiWeb.search({
  unique_id: AI_WEB_UNIQUE_IDS.searchNews,
  query,
  max_results: 3,
  source: "news",
});
printSummary("AI Web search", search);

const map = await client.aiWeb.map({
  unique_id: AI_WEB_UNIQUE_IDS.map,
  url,
  limit: 10,
});
printSummary("AI Web map", map);

const extract = await client.aiWeb.extract({
  unique_id: AI_WEB_UNIQUE_IDS.extract,
  url,
  formats: ["markdown"],
});
printSummary("AI Web extract", extract);
