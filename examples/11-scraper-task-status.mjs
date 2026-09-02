import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, requireEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });
const taskId = requireEnv("DATAIFY_TEST_TASK_ID", "set DATAIFY_TEST_TASK_ID=your_task_id");

const status = await client.scraper.getTaskStatus(taskId);
printSummary("Scraper task status", status);
