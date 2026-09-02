import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, requireEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const taskId = requireEnv("DATAIFY_TEST_TASK_ID", "set DATAIFY_TEST_TASK_ID=your_task_id");
const type = optionalEnv("DATAIFY_TEST_DOWNLOAD_TYPE") || "json";

if (type === "json") {
  const result = await client.scraper.downloadTaskResult(taskId);
  printSummary("Downloaded JSON result", result);
} else {
  const response = await client.scraper.downloadTaskFile(taskId, type);
  console.log(`status: ${response.status}`);
  console.log(`content-type: ${response.headers.get("content-type")}`);
}