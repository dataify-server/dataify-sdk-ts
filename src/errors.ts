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

export class DataifyMissingTokenError extends DataifySdkError {
  constructor(_kind: "apiKey") {
    super("Missing Dataify API token. Set DATAIFY_API_TOKEN; DATAIFY_TOKEN and DATAIFY_API_KEY are supported for compatibility.");
    this.name = "DataifyMissingTokenError";
  }
}

export class DataifyUnsupportedDownloadTypeError extends DataifySdkError {
  constructor() {
    super("Unsupported scraper download type. Use json, csv, or xlsx.");
    this.name = "DataifyUnsupportedDownloadTypeError";
  }
}
