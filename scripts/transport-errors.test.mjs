import assert from "node:assert/strict";
import test from "node:test";

import {
  DataifyClient,
  DataifyConnectionError,
  DataifySdkError,
  DataifyTimeoutError,
} from "../dist/index.js";

test("network failures are wrapped as DataifyConnectionError", async () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    scraperBaseUrl: "https://scraper.test",
    fetchImpl: async () => {
      throw new TypeError("fetch failed");
    },
  });

  await assert.rejects(
    client.serp.runSerpTool("google", { q: "OpenAI" }),
    (error) => error instanceof DataifyConnectionError &&
      error instanceof DataifySdkError &&
      error.url === "https://scraper.test/request" &&
      error.originalError instanceof TypeError,
  );
});

test("request timeouts are wrapped as DataifyTimeoutError", async () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    scraperBaseUrl: "https://scraper.test",
    timeoutMs: 5,
    fetchImpl: (_url, init) => new Promise((_resolve, reject) => {
      const signal = init?.signal;
      const rejectAbort = () => {
        const error = new Error("The operation was aborted");
        error.name = "AbortError";
        reject(error);
      };
      if (signal?.aborted) {
        rejectAbort();
      } else {
        signal?.addEventListener("abort", rejectAbort, { once: true });
      }
    }),
  });

  await assert.rejects(
    client.serp.runSerpTool("google", { q: "OpenAI" }),
    (error) => error instanceof DataifyTimeoutError &&
      error instanceof DataifySdkError &&
      error.url === "https://scraper.test/request" &&
      error.timeoutMs === 5 &&
      /timed out after 5ms/.test(error.message),
  );
});

test("download response network failures use the same SDK error hierarchy", async () => {
  const client = new DataifyClient({
    apiKey: "api-key",
    scraperBaseUrl: "https://scraper.test",
    fetchImpl: async () => {
      throw new TypeError("fetch failed");
    },
  });

  await assert.rejects(
    client.scraper.downloadTaskFile("task-123"),
    (error) => error instanceof DataifyConnectionError &&
      error instanceof DataifySdkError &&
      error.url.includes("/download?"),
  );
});
