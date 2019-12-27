const { callService, LOGGER_SERVICE } = require('../util/aws-connector');

export async function logError({ user, error }) {
  const requestBody = {
    user,
    error,
  };

  await callService(LOGGER_SERVICE, requestBody);
}
