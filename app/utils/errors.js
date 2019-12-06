export class WebIntegrationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, WebIntegrationError);
  }
}

export class OtherError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, OtherError);
  }
}
