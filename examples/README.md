# Dataify SDK Examples

These files test the SDK from local `dist` or from an installed `dataify-sdk` package.

## Setup

CMD:

```bat
set "DATAIFY_API_TOKEN=your_api_key"
```

PowerShell:

```powershell
$env:DATAIFY_API_TOKEN="your_api_key"
```

## Safe dry-run, no credits

```bat
node examples\10-mock-dry-run.mjs
```

## Real API tests

These calls may consume credits.

```bat
node examples\01-serp-google.mjs
node examples\02-serp-news-and-maps.mjs
node examples\03-web-unlocker.mjs
node examples\05-scraper-amazon-by-keyword.mjs
node examples\06-scraper-social.mjs
node examples\07-scraper-ecommerce.mjs
```

## Tests that need extra values

Amazon product by URL:

```bat
set "DATAIFY_TEST_AMAZON_URL=https://www.amazon.com/dp/REAL_ASIN"
node examples\04-scraper-amazon-by-url.mjs
```

Download scraper result:

```bat
set "DATAIFY_TEST_TASK_ID=your_task_id"
node examples\08-download-result.mjs
```

Query scraper task status:

```bat
set "DATAIFY_TEST_TASK_ID=your_task_id"
node examples\11-scraper-task-status.mjs
```

Optional variables:

```bat
set "DATAIFY_TEST_QUERY=OpenAI"
set "DATAIFY_TEST_LOCATION=New York"
set "DATAIFY_TEST_URL=https://example.com"
set "DATAIFY_TEST_KEYWORD=coffee"
set "DATAIFY_TEST_DOWNLOAD_TYPE=json"
```

## List generated tools

```bat
node examples\09-list-tools.mjs
```
