const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");
if (!dist.startsWith(root + path.sep)) {
  throw new Error(`Refusing to remove path outside package root: ${dist}`);
}
fs.rmSync(dist, { recursive: true, force: true });