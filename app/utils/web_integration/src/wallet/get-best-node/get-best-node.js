const { callService, BEST_NODE_SERVICE } = require('../../util/aws-connector');

export async function getBestNode() {
  const response = await callService(BEST_NODE_SERVICE, {
    region: process.env.NODE_REGION,
  });

  if (!response.OK) {
    return response;
  }

  return response.body;
}
