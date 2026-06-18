# Dataify TypeScript SDK

`dataify-sdk` is a TypeScript/JavaScript SDK for Dataify scraping runtime APIs.

## Included Features

- Scraper tools: `client.tools.<methodName>(params)`
- SERP tools: `client.tools.google(params)`, `client.tools.bing(params)`, and other generated SERP methods
- Web Unlocker: `client.webUnlocker.request(params)`
- Scraper result download by task id

## Requirements

- Node.js 18 or later
- A Dataify API Key

## Install

```bash
npm install dataify-sdk
```

## Basic Usage

```ts
import { DataifyClient } from "dataify-sdk";

const client = new DataifyClient({
  apiKey: process.env.DATAIFY_API_KEY,
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

## Download Scraper Result

```ts
const json = await client.scraper.downloadTaskResult("task_id_here");

const response = await client.scraper.downloadTaskFile("task_id_here", "xlsx");
console.log(response.status);
```

## Runtime Endpoints

- Scraper and SERP: `https://scraperapi.dataify.com`
- Web Unlocker: `https://webunlocker.dataify.com`

Requests use:

```text
Authorization: Bearer <api_key>
```

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