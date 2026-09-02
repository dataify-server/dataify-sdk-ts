import assert from "node:assert/strict";
import test from "node:test";

import { DataifyApiError, DataifyClient, DataifyUnsupportedDownloadTypeError } from "../dist/index.js";

test("downloadTaskResult requests JSON with documented query authentication", async () => {
  const calls = [];
  const client = new DataifyClient({
    apiKey: "api key? &",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ items: [{ id: "result-1" }] }), { status: 200 });
    },
  });

  const result = await client.scraper.downloadTaskResult(" task id? & ");
  assert.deepEqual(result, { items: [{ id: "result-1" }] });

  const call = calls[0];
  const requestUrl = new URL(call.url);
  assert.equal(call.init.method, "GET");
  assert.equal(requestUrl.pathname, "/download");
  assert.equal(requestUrl.searchParams.get("api_key"), "api key? &");
  assert.equal(requestUrl.searchParams.get("task_id"), "task id? &");
  assert.equal(requestUrl.searchParams.get("type"), "json");
  assert.equal(call.init.headers?.Authorization, undefined);
});

test("downloadTaskFile preserves json, csv, and xlsx responses", async () => {
  for (const scenario of [
    { type: "json", body: "{\"ok\":true}" },
    { type: "csv", body: "id,name\n1,coffee\n" },
    { type: "xlsx", body: "PK\u0003\u0004" },
  ]) {
    const client = new DataifyClient({
      apiKey: "api-key",
      fetchImpl: async () => new Response(scenario.body, { status: 200 }),
    });

    const response = await client.scraper.downloadTaskFile("task-123", scenario.type);
    assert.equal(await response.text(), scenario.body);
  }
});

test("download methods propagate HTTP failures", async () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    fetchImpl: async () => new Response(JSON.stringify({ data: "Task_id is error!", code: 400 }), { status: 400 }),
  });

  await assert.rejects(
    client.scraper.downloadTaskResult("unknown-task"),
    (error) => error instanceof DataifyApiError && error.status === 400,
  );
});

test("downloadTaskFile rejects an unsupported format before sending a request", () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    fetchImpl: async () => {
      throw new Error("fetch should not be called");
    },
  });

  assert.throws(
    () => client.scraper.downloadTaskFile("task-123", "xml"),
    (error) => error instanceof DataifyUnsupportedDownloadTypeError,
  );
});
