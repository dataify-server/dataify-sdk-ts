import { loadDataifySdk } from "./_load-sdk.mjs";

const { DataifyClient } = await loadDataifySdk();
const calls = [];
const fetchImpl = async (url, init = {}) => {
  calls.push({
    url: String(url),
    method: init.method,
    headers: init.headers,
    bodyType: init.body?.constructor?.name,
    body: init.body?.toString?.(),
  });
  return new Response(JSON.stringify({ ok: true, mocked: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

const client = new DataifyClient({
  apiKey: "TEST_API_KEY",
  fetchImpl,
});

await client.tools.google({ q: "Dataify", json: "1" });
await client.tools.amazonProductByUrl({ url: "https://www.amazon.com/dp/B000000000" });
await client.webUnlocker.request({ url: "https://example.com", type: "html", js_render: false });

console.log(JSON.stringify(calls, null, 2));