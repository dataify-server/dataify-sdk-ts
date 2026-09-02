export async function loadDataifySdk() {
  try {
    return await import("dataify-sdk");
  } catch (error) {
    if (error?.code !== "ERR_MODULE_NOT_FOUND") throw error;
    return import("../dist/index.js");
  }
}