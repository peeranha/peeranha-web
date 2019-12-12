export class WebIntegrationError extends Error {
  constructor(...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WebIntegrationError);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export class ApplicationError extends Error {
  constructor(...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export class BlockchainError extends Error {
  constructor(...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BlockchainError);
    } else {
      this.stack = new Error().stack;
    }
  }
}
