import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const q = optionalEnv("DATAIFY_TEST_QUERY") || "Dataify";
const location = optionalEnv("DATAIFY_TEST_LOCATION") || "New York";

const news = await client.tools.googleNews({
  q,
  json: "1",
});
printSummary("Google News result", news);

const maps = await client.tools.googleMaps({
  q: `coffee near ${location}`,
  json: "1",
});
printSummary("Google Maps result", maps);