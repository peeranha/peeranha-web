import { callService, LOGGER_SERVICE } from './aws-connector';

export async function reportUIError({ account, error }) {
  const requestBody = {
    user: account,
    error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
  };
  await callService(LOGGER_SERVICE, requestBody);
}
