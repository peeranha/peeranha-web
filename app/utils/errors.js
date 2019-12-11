export class WebIntegrationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, WebIntegrationError);
  }
}

export class ApplicationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, ApplicationError);
  }
}

export class BlockchainError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, BlockchainError);
  }
}
