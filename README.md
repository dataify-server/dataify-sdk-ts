# Dataify TypeScript SDK

`dataify-sdk` is a TypeScript/JavaScript SDK for Dataify scraping runtime APIs.

## Included Features

- Scraper tools: `client.tools.<methodName>(params)`
- SERP tools: `client.tools.google(params)`, `client.tools.bing(params)`, and other generated SERP methods
- Web Unlocker: `client.webUnlocker.request(params)`
- AI Web: `client.aiWeb.search(params)`, `client.aiWeb.map(params)`, and `client.aiWeb.extract(params)`
- Scraper result download by task id

## Requirements

- Node.js 18 or later
- A Dataify API Key

## Install

```bash
npm install dataify-sdk
```

Set `DATAIFY_API_TOKEN` for local development and deployment. `DATAIFY_TOKEN` and
`DATAIFY_API_KEY` remain supported for compatibility with earlier SDK examples.
When a legacy variable provides the credential, Node.js emits one migration
warning per variable per process without including the credential value.

## Basic Usage

```ts
import { DataifyClient } from "dataify-sdk";

const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
});

const result = await client.tools.google({
  q: "Dataify",
  json: "1",
});

console.log(result);
```

## Scraper Example

```ts
const result = await client.tools.amazonProductByUrl({
  url: "https://www.amazon.com/dp/B000000000",
});
```

The Amazon URL above is only a placeholder. Use a real product URL when testing.

## Web Unlocker Example

```ts
const result = await client.webUnlocker.request({
  url: "https://example.com",
  type: "html",
  js_render: false,
});
```

## AI Web Example

AI Web uses the `unique_id` configured for the selected tool. The three search,
map, and extract methods normalize `outputs` to an array for consistent handling:

```ts
import { AI_WEB_UNIQUE_IDS, DataifyClient } from "dataify-sdk";

const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
  aiWebBaseUrl: process.env.AI_WEB_API_BASE_URL ?? "https://aiwebapi.dataify.com",
});

const result = await client.aiWeb.search({
  unique_id: AI_WEB_UNIQUE_IDS.searchNews,
  query: "Dataify",
  max_results: 3,
  source: "news",
});

console.log(result.request_id); // X-Request-Id, or null
console.log(result.outputs);    // always an array
```

AI Web defaults to `https://aiwebapi.dataify.com`. Set `AI_WEB_API_BASE_URL` or
pass `aiWebBaseUrl` to override it for a custom environment:

```ts
const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
  aiWebBaseUrl: "https://aiwebapi.dataify.com",
});
```

See [docs/AI_WEB.md](docs/AI_WEB.md) for the full parameter and
download reference.

Use `executeRaw(operation, params)` when the exact upstream output shape is
needed. `downloadResult(taskId)` downloads a successful AI Web task within the
retention window:

```ts
const raw = await client.aiWeb.executeRaw("extract", {
  unique_id: AI_WEB_UNIQUE_IDS.extract,
  url: "https://example.com",
  formats: ["markdown"],
});

if (raw.request_id) {
  const downloaded = await client.aiWeb.downloadResult(raw.request_id);
  console.log(downloaded);
}
```

## Download Scraper Result

```ts
const json = await client.scraper.downloadTaskResult("task_id_here");

const response = await client.scraper.downloadTaskFile("task_id_here", "xlsx");
console.log(response.status);
```

`downloadTaskFile` accepts `"json"`, `"csv"`, or `"xlsx"` and returns the
caller-owned `Response` body. Use `downloadTaskResult` when the JSON payload
should be parsed automatically.

## Scraper Task Status

```ts
const status = await client.scraper.getTaskStatus("task_id_here");
console.log(status.data.status); // 处理中, 成功, or 失败
```

The service returns HTTP `400` when the task does not exist or is not owned by
the API key, and HTTP `403` for a missing `task_id` or invalid API key.

## Runtime Endpoints

- Scraper and SERP: `https://scraperapi.dataify.com`
- Web Unlocker: `https://webunlocker.dataify.com`
- AI Web: `https://aiwebapi.dataify.com`

Most requests use:

```text
Authorization: Bearer <api_key>
```

Scraper result downloads and task-status queries use the API contract's
`api_key` query parameter instead.

## Local Development

```bash
npm install
npm run generate
npm run check
npm run build
npm pack --dry-run
```

## Notes

- Do not use this SDK directly in browser frontend code, because the API Key would be exposed.
- Recommended architecture: frontend -> your backend -> `dataify-sdk` -> Dataify APIs.
