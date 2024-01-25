export const TRANSACTION_LIST = 'transactionList';
export const setTransactionResult = (
  transactionHash,
  result,
  transactionList,
  setTransactionList,
) => {
  const pendingTransaction = transactionList.find(
    (transactionFromList) => transactionFromList.transactionHash === transactionHash,
  );
  if (pendingTransaction) {
    pendingTransaction.result = result;
  }
  setTransactionList(transactionList);
  writeTransactionList(transactionList, 1);
  setTimeout(() => {
    const index = transactionList
      .map((transactionFromList) => transactionFromList.transactionHash)
      .indexOf(transactionHash);
    if (index !== -1) {
      transactionList.splice(index, 1);
      setTransactionList(transactionList);
      writeTransactionList(transactionList, 2);
    }
  }, 30000);
};

export const writeTransactionList = (transactionList, number) => {
  localStorage.setItem(TRANSACTION_LIST, JSON.stringify(transactionList));
};
