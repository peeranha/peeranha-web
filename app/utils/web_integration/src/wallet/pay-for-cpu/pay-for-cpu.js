const {
  callService,
  PAY_FOR_CPU_SERVICE,
} = require('../../util/aws-connector');

export async function payForCpu(transaction, transactionHeaders) {
  const response = await callService(PAY_FOR_CPU_SERVICE, {
    transaction,
    transactionHeaders,
  });

  if (!response.OK) {
    return null;
  }

  const pushTransactionArgs = {
    ...response.body,
    serializedTransaction: Buffer.from(response.body.signedTransaction, `hex`),
  };

  return pushTransactionArgs;
}
