import assert from "node:assert/strict";
import test from "node:test";

import { DataifyApiError, DataifyClient, DataifyMissingTokenError } from "../dist/index.js";

test("getTaskStatus sends the documented query without a bearer header", async () => {
  const calls = [];
  const client = new DataifyClient({
    apiKey: "api key? &",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({
        data: { task_id: "task id? &", status: "处理中" },
        code: 200,
      }), { status: 200 });
    },
  });

  const response = await client.scraper.getTaskStatus(" task id? & ");
  assert.deepEqual(response, {
    data: { task_id: "task id? &", status: "处理中" },
    code: 200,
  });
  assert.equal(calls.length, 1);

  const call = calls[0];
  const requestUrl = new URL(call.url);
  assert.equal(call.init.method, "GET");
  assert.equal(requestUrl.pathname, "/task_status");
  assert.equal(requestUrl.searchParams.get("api_key"), "api key? &");
  assert.equal(requestUrl.searchParams.get("task_id"), "task id? &");
  assert.equal(call.init.headers?.Authorization, undefined);
});

test("getTaskStatus preserves every documented Chinese task status", async () => {
  for (const status of ["处理中", "成功", "失败"]) {
    const client = new DataifyClient({
      apiKey: "api-key",
      fetchImpl: async () => new Response(JSON.stringify({
        data: { task_id: "task-123", status },
        code: 200,
      }), { status: 200 }),
    });

    const response = await client.scraper.getTaskStatus("task-123");
    assert.equal(response.data.status, status);
  }
});

test("getTaskStatus propagates documented 400 and 403 responses", async () => {
  for (const scenario of [
    { taskId: "", status: 403, body: { data: "missing task_id", code: 403 } },
    { taskId: "unknown-task", status: 400, body: { data: "Task_id is error!", code: 400 } },
  ]) {
    const client = new DataifyClient({
      apiKey: "api-key",
      fetchImpl: async () => new Response(JSON.stringify(scenario.body), { status: scenario.status }),
    });

    await assert.rejects(
      client.scraper.getTaskStatus(scenario.taskId),
      (error) => error instanceof DataifyApiError && error.status === scenario.status,
    );
  }
});

test("getTaskStatus rejects a missing local token before sending a request", async () => {
  const client = new DataifyClient({
    apiKey: "",
    fetchImpl: async () => {
      throw new Error("fetch should not be called");
    },
  });

  await assert.rejects(
    client.scraper.getTaskStatus("task-123"),
    (error) => error instanceof DataifyMissingTokenError,
  );
});
