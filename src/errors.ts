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
  constructor(kind: "apiKey") {
    super(`Missing ${kind}.`);
    this.name = "DataifyMissingTokenError";
  }
}