import { ACTION_FULFILLED } from 'utils/constants';
import { setCookie } from 'utils/cookie';

export const TRANSACTION_LIST = 'transactionList';

export const setActionFulfilled = () => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);
  setCookie({
    name: ACTION_FULFILLED,
    value: true,
    options: {
      defaultPath: true,
      allowSubdomains: true,
      expires: expirationDate,
    },
  });
};
export const setTransactionResult = (
  transactionHash,
  result,
  transactionList,
  setTransactionList,
) => {
  if (result.status) {
    setActionFulfilled();
  }
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
