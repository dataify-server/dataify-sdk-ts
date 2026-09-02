import assert from "node:assert/strict";
import test from "node:test";

import { DataifyClient, DataifyMissingTokenError } from "../dist/index.js";

const tokenEnvironmentNames = ["DATAIFY_API_TOKEN", "DATAIFY_TOKEN", "DATAIFY_API_KEY"];

async function withTokenEnvironment(values, action) {
  const originalValues = new Map(tokenEnvironmentNames.map((name) => [name, process.env[name]]));
  try {
    for (const name of tokenEnvironmentNames) {
      const value = values[name];
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
    await action();
  } finally {
    for (const [name, value] of originalValues) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  }
}

async function withWarningCapture(action) {
  const originalEmitWarning = process.emitWarning;
  const warnings = [];
  process.emitWarning = (warning) => {
    warnings.push(String(warning));
  };
  try {
    await action(warnings);
  } finally {
    process.emitWarning = originalEmitWarning;
  }
}

test("resolves explicit and compatible environment tokens in priority order", async () => {
  await withWarningCapture(async (warnings) => {
    const cases = [
    {
      name: "explicit legacy apiKey wins and warns",
      explicitApiKey: "legacy-token",
      environment: {
        DATAIFY_API_TOKEN: "standard-token",
        DATAIFY_TOKEN: "legacy-token",
        DATAIFY_API_KEY: "legacy-api-key",
      },
      want: "legacy-token",
    },
    {
      name: "standard token wins over legacy variables",
      explicitApiKey: undefined,
      environment: {
        DATAIFY_API_TOKEN: "standard-token",
        DATAIFY_TOKEN: "legacy-token",
        DATAIFY_API_KEY: "legacy-api-key",
      },
      want: "standard-token",
    },
    {
      name: "legacy token wins over legacy api key",
      explicitApiKey: undefined,
      environment: {
        DATAIFY_TOKEN: "legacy-token",
        DATAIFY_API_KEY: "legacy-api-key",
      },
      want: "legacy-token",
    },
    {
      name: "legacy api key remains supported",
      explicitApiKey: undefined,
      environment: { DATAIFY_API_KEY: "legacy-api-key" },
      want: "legacy-api-key",
    },
    {
      name: "whitespace values are ignored",
      explicitApiKey: "  ",
      environment: {
        DATAIFY_API_TOKEN: "\t",
        DATAIFY_TOKEN: "legacy-token",
        DATAIFY_API_KEY: "legacy-api-key",
      },
      want: "legacy-token",
    },
    ];

    for (const scenario of cases) {
      await withTokenEnvironment(scenario.environment, async () => {
        const client = new DataifyClient({ apiKey: scenario.explicitApiKey });
        assert.equal(client.apiKey, scenario.want, scenario.name);
      });
    }

    const output = warnings.join("\n");
    for (const warning of [
      "dataify: DATAIFY_TOKEN 已兼容读取，建议迁移至 DATAIFY_API_TOKEN。",
      "dataify: DATAIFY_API_KEY 已兼容读取，建议迁移至 DATAIFY_API_TOKEN。",
    ]) {
      assert.equal(output.split(warning).length - 1, 1, `expected one ${warning}`);
    }
    for (const token of ["standard-token", "legacy-token", "legacy-api-key"]) {
      assert.doesNotMatch(output, new RegExp(token));
    }
  });
});

test("missing token guidance names the standard and compatible variables", async () => {
  await withTokenEnvironment({}, async () => {
    const client = new DataifyClient();
    await assert.rejects(
      client.tools.google({ q: "token compatibility", json: "1" }),
      (error) => {
        assert.ok(error instanceof DataifyMissingTokenError);
        for (const name of tokenEnvironmentNames) {
          assert.match(error.message, new RegExp(name));
        }
        return true;
      },
    );
  });
});
