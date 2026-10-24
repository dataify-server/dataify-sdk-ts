# AI Web API

`client.aiWeb` calls the synchronous AI Web search, map, and extract endpoints.
All requests use the Dataify Bearer token. The SDK reads the response header
`X-Request-Id` and exposes it as `request_id`.

## Basic usage

```ts
import { AI_WEB_UNIQUE_IDS, DataifyClient } from "dataify-sdk";

const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
  aiWebBaseUrl: process.env.AI_WEB_API_BASE_URL ?? "https://aiwebapi.dataify.com",
});

const result = await client.aiWeb.search({
  unique_id: AI_WEB_UNIQUE_IDS.searchNews,
  query: "OpenAI",
  max_results: 3,
  source: "news",
});

console.log(result.request_id);
console.log(result.outputs);
```

`AI_WEB_UNIQUE_IDS` exposes the fixed IDs used by the current AI Web gateway:
`search_web`, `search_shopping`, `search_news`, `search_scholar`, `map`, and
`extract`. A custom gateway can still use different IDs by passing `unique_id`
directly.

## Methods

| SDK method | Upstream endpoint | Description |
|---|---|---|
| `client.aiWeb.search(params)` | `POST /search` | Aggregate web, news, shopping, and scholar search; optionally extract result content |
| `client.aiWeb.map(params)` | `POST /map` | Discover page URLs, titles, and descriptions |
| `client.aiWeb.extract(params)` | `POST /extract` | Extract markdown, raw HTML, clean HTML, or links |
| `client.aiWeb.execute(operation, params)` | `POST /search`, `/map`, `/extract` | Call the selected operation and normalize `outputs` to an array |
| `client.aiWeb.executeRaw(operation, params)` | `POST /search`, `/map`, `/extract` | Preserve the upstream `outputs` shape |
| `client.aiWeb.downloadResult(taskId)` | `POST /download` | Download a successful AI Web result retained by the service |

The convenience methods return:

```ts
interface AIWebResponse<T> {
  request_id: string | null;
  outputs: T;
}
```

`search`, `map`, `extract`, and `execute` normalize outputs consistently:

- `null` and `undefined` become `[]`
- arrays remain arrays
- a single object is wrapped in a one-element array

Use `executeRaw` when the exact upstream output shape is required.

## Common parameters

### Search

```ts
await client.aiWeb.search({
  unique_id: AI_WEB_UNIQUE_IDS.searchNews,
  query: "OpenAI",
  max_results: 10,
  source: "news", // news | shopping | scholar
  country: "US",
  language: "en",
  time_range: "week",
  extract_content: true,
  extract_options: {
    formats: ["markdown"],
    only_main_content: true,
    advanced_mode: true,
  },
});
```

When extracting result content, `extract_options.formats` supports
`markdown`, `raw_html`, `clean_html`, and `links`.

### Map

```ts
await client.aiWeb.map({
  unique_id: AI_WEB_UNIQUE_IDS.map,
  url: "https://docs.example.com",
  country: "US",
  domain_filter: "all", // domain | all
  limit: 100,
  sitemap: "include", // skip | include | only
});
```

### Extract

```ts
await client.aiWeb.extract({
  unique_id: AI_WEB_UNIQUE_IDS.extract,
  url: "https://example.com/article",
  formats: ["markdown", "links"],
  only_main_content: true,
  headers: {
    "User-Agent": "Dataify SDK",
  },
  timeout_ms: 60_000,
  advanced_mode: true,
});
```

## Downloading results

Keep `request_id` and use it while the result is retained:

```ts
const result = await client.aiWeb.extract({
  unique_id: AI_WEB_UNIQUE_IDS.extract,
  url: "https://example.com/article",
  formats: ["markdown"],
});

if (result.request_id) {
  const downloaded = await client.aiWeb.downloadResult(result.request_id);
  console.log(downloaded);
}
```

## Gateway configuration

The default gateway is `https://aiwebapi.dataify.com`. Set
`AI_WEB_API_BASE_URL` or pass `aiWebBaseUrl` explicitly to use a custom
environment:

```ts
const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_TOKEN,
  aiWebBaseUrl: "https://aiwebapi.dataify.com",
});
```

HTTP failures throw `DataifyApiError` with `status` and `body`. A missing API
key throws `DataifyMissingTokenError` before the request is sent.

Network connection failures throw `DataifyConnectionError`; request timeouts
throw `DataifyTimeoutError`. Both extend `DataifySdkError`, so SDK consumers can
use one `catch` block for transport and API failures. Invalid operations throw
`DataifyUnsupportedAIWebOperationError`, and a missing download task id throws
`DataifyMissingAIWebTaskIdError`.
