import assert from "node:assert/strict";
import test from "node:test";

import {
  AI_WEB_UNIQUE_IDS,
  DataifyApiError,
  DataifyClient,
  DataifyMissingAIWebTaskIdError,
  DataifyMissingTokenError,
  DataifySdkError,
  DataifyUnsupportedAIWebOperationError,
} from "../dist/index.js";
import { withNoTokenEnvironment } from "./test-env.mjs";

test("AI_WEB_UNIQUE_IDS exposes every supported AI Web tool id", () => {
  assert.deepEqual(AI_WEB_UNIQUE_IDS, {
    searchWeb: "search_web",
    searchShopping: "search_shopping",
    searchNews: "search_news",
    searchScholar: "search_scholar",
    map: "map",
    extract: "extract",
  });
});

test("aiWeb.search sends the documented search request and normalizes outputs", async () => {
  const calls = [];
  const client = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example/",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify([
        { position: 1, title: "OpenAI", url: "https://openai.com" },
      ]), {
        status: 200,
        headers: { "X-Request-Id": " req-123 " },
      });
    },
  });

  const response = await client.aiWeb.search({
    unique_id: AI_WEB_UNIQUE_IDS.searchNews,
    query: "OpenAI",
    max_results: 3,
    source: "news",
    extract_content: true,
    extract_options: { formats: ["markdown"] },
  });

  assert.deepEqual(response, {
    request_id: "req-123",
    outputs: [{ position: 1, title: "OpenAI", url: "https://openai.com" }],
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://ai-web.example/search");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers.Authorization, "Bearer api-key");
  assert.equal(calls[0].init.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    unique_id: AI_WEB_UNIQUE_IDS.searchNews,
    query: "OpenAI",
    max_results: 3,
    source: "news",
    extract_content: true,
    extract_options: { formats: ["markdown"] },
  });
});

test("aiWebBaseUrl resolves the environment and explicit options in priority order", () => {
  const originalBaseUrl = process.env.AI_WEB_API_BASE_URL;
  try {
    delete process.env.AI_WEB_API_BASE_URL;
    const defaultClient = new DataifyClient({
      apiKey: "api-key",
      fetchImpl: async () => new Response("[]", { status: 200 }),
    });
    assert.equal(defaultClient.aiWebBaseUrl, "https://aiwebapi.dataify.com");

    process.env.AI_WEB_API_BASE_URL = "https://env-ai-web.example/";
    const envClient = new DataifyClient({
      apiKey: "api-key",
      fetchImpl: async () => new Response("[]", { status: 200 }),
    });
    assert.equal(envClient.aiWebBaseUrl, "https://env-ai-web.example");

    const explicitClient = new DataifyClient({
      apiKey: "api-key",
      aiWebBaseUrl: "https://explicit-ai-web.example/",
      fetchImpl: async () => new Response("[]", { status: 200 }),
    });
    assert.equal(explicitClient.aiWebBaseUrl, "https://explicit-ai-web.example");
  } finally {
    if (originalBaseUrl === undefined) {
      delete process.env.AI_WEB_API_BASE_URL;
    } else {
      process.env.AI_WEB_API_BASE_URL = originalBaseUrl;
    }
  }
});

test("aiWeb.map and aiWeb.extract use their own routes and unify null/object outputs", async () => {
  const calls = [];
  const responses = [
    new Response("null", { status: 200 }),
    new Response(JSON.stringify({ markdown: "# Example", links: ["https://example.com"] }), { status: 200 }),
  ];
  const client = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      return responses.shift();
    },
  });

  assert.deepEqual(await client.aiWeb.map({
    unique_id: AI_WEB_UNIQUE_IDS.map,
    url: "https://example.com",
    limit: 100,
  }), {
    request_id: null,
    outputs: [],
  });
  assert.deepEqual(await client.aiWeb.extract({
    unique_id: AI_WEB_UNIQUE_IDS.extract,
    url: "https://example.com/article",
    formats: ["markdown", "links"],
  }), {
    request_id: null,
    outputs: [{
      markdown: "# Example",
      links: ["https://example.com"],
    }],
  });

  assert.equal(calls[0].url, "https://ai-web.example/map");
  assert.equal(calls[1].url, "https://ai-web.example/extract");
});

test("aiWeb.executeRaw preserves the upstream output shape", async () => {
  const payload = { markdown: "# Example" };
  const client = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example",
    fetchImpl: async () => new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "X-Request-Id": "req-raw" },
    }),
  });

  assert.deepEqual(await client.aiWeb.executeRaw("extract", {
    unique_id: AI_WEB_UNIQUE_IDS.extract,
    url: "https://example.com",
  }), {
    request_id: "req-raw",
    outputs: payload,
  });
});

test("aiWeb.downloadResult uses Bearer auth and does not duplicate the API key in the body", async () => {
  const calls = [];
  const client = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ markdown: "# Downloaded" }), { status: 200 });
    },
  });

  const response = await client.aiWeb.downloadResult(" task-123 ");
  assert.deepEqual(response, { markdown: "# Downloaded" });
  assert.equal(calls[0].url, "https://ai-web.example/download");
  assert.equal(calls[0].init.headers.Authorization, "Bearer api-key");
  assert.deepEqual(JSON.parse(calls[0].init.body), { task_id: "task-123" });
});

test("aiWeb rejects invalid operations, HTTP failures, missing task ids, and missing tokens", async () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example",
    fetchImpl: async () => new Response(JSON.stringify({
      success: false,
      code: "INVALID_API_KEY",
      message: "invalid",
    }), { status: 401 }),
  });

  await assert.rejects(
    client.aiWeb.execute("unknown", { unique_id: "x" }),
    (error) => error instanceof DataifyUnsupportedAIWebOperationError &&
      error instanceof DataifySdkError &&
      error.operation === "unknown",
  );
  await assert.rejects(
    client.aiWeb.search({ unique_id: AI_WEB_UNIQUE_IDS.searchNews, query: "OpenAI" }),
    (error) => error instanceof DataifyApiError && error.status === 401,
  );

  await withNoTokenEnvironment(async () => {
    const missingTokenClient = new DataifyClient({
      apiKey: "",
      aiWebBaseUrl: "https://ai-web.example",
      fetchImpl: async () => {
        throw new Error("fetch should not be called");
      },
    });
    await assert.rejects(
      missingTokenClient.aiWeb.search({ unique_id: AI_WEB_UNIQUE_IDS.searchNews, query: "OpenAI" }),
      (error) => error instanceof DataifyMissingTokenError,
    );
  });

  const missingTaskIdClient = new DataifyClient({
    apiKey: "api-key",
    aiWebBaseUrl: "https://ai-web.example",
    fetchImpl: async () => {
      throw new Error("fetch should not be called");
    },
  });
  await assert.rejects(
    missingTaskIdClient.aiWeb.downloadResult(undefined),
    (error) => error instanceof DataifyMissingAIWebTaskIdError && error instanceof DataifySdkError,
  );
});
