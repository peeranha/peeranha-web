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
  localStorage.setItem(TRANSACTION_LIST, JSON.stringify(transactionList));
  setTimeout(() => {
    const index = transactionList
      .map((transactionFromList) => transactionFromList.transactionHash)
      .indexOf(transactionHash);
    if (index !== -1) {
      transactionList.splice(index, 1);
      setTransactionList(transactionList);
      localStorage.setItem(TRANSACTION_LIST, JSON.stringify(transactionList));
    }
  }, 30000);
};
