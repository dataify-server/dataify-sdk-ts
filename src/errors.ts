export class DataifySdkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataifySdkError";
  }
}

export class DataifyApiError extends DataifySdkError {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`Dataify API request failed with HTTP ${status}`);
    this.name = "DataifyApiError";
    this.status = status;
    this.body = body;
  }
}

export class DataifyConnectionError extends DataifySdkError {
  readonly url: string;
  readonly originalError: unknown;

  constructor(url: string, originalError?: unknown) {
    super(`Unable to connect to Dataify API at ${url}: ${formatErrorReason(originalError)}`);
    this.name = "DataifyConnectionError";
    this.url = url;
    this.originalError = originalError;
  }
}

export class DataifyTimeoutError extends DataifySdkError {
  readonly url: string;
  readonly timeoutMs: number;
  readonly originalError: unknown;

  constructor(url: string, timeoutMs: number, originalError?: unknown) {
    super(`Dataify API request to ${url} timed out after ${timeoutMs}ms`);
    this.name = "DataifyTimeoutError";
    this.url = url;
    this.timeoutMs = timeoutMs;
    this.originalError = originalError;
  }
}

export class DataifyMissingTokenError extends DataifySdkError {
  constructor(_kind: "apiKey") {
    super("Missing Dataify API token. Set DATAIFY_API_TOKEN; DATAIFY_TOKEN and DATAIFY_API_KEY are supported for compatibility.");
    this.name = "DataifyMissingTokenError";
  }
}

export class DataifyUnsupportedAIWebOperationError extends DataifySdkError {
  readonly operation: string;

  constructor(operation: unknown) {
    const normalized = String(operation);
    super(`Unsupported AI Web operation: ${normalized}`);
    this.name = "DataifyUnsupportedAIWebOperationError";
    this.operation = normalized;
  }
}

export class DataifyMissingAIWebTaskIdError extends DataifySdkError {
  constructor() {
    super("Missing AI Web task id. Pass the request_id returned by search, map, or extract.");
    this.name = "DataifyMissingAIWebTaskIdError";
  }
}

export class DataifyUnsupportedDownloadTypeError extends DataifySdkError {
  constructor() {
    super("Unsupported scraper download type. Use json, csv, or xlsx.");
    this.name = "DataifyUnsupportedDownloadTypeError";
  }
}

function formatErrorReason(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return "unknown transport error";
}
