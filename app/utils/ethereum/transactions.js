import {
  CURRENCY,
  DISPATCHER_TRANSACTIONS_ALLOWED,
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  INVALID_MIN_RATING_ERROR_CODE,
  META_TRANSACTIONS_ALLOWED,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
  TRANSACTIONS_ALLOWED,
  TYPE_OF_TRANSACTIONS,
  USER_MIN_RATING_ERROR_CODE,
} from 'utils/constants';
import { getCookie } from 'utils/cookie';
import { WebIntegrationErrorByCode } from 'utils/errors';
import { TRANSACTION_LIST } from 'utils/ethereum/transactionsListManagement';

export async function sendTransactionMethod(
  network,
  contract,
  actor,
  action,
  data,
  confirmations = 1,
) {
  let dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const balance = this.wallet?.accounts?.[0]?.balance?.[CURRENCY];
  const transactionsAllowed = dataFromCookies === TRANSACTIONS_ALLOWED;
  if (!dataFromCookies) {
    this.showModalDispatch();
    await this.waitForCloseModal();
    dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  }
  if (transactionsAllowed && Number(balance) < 0.005) {
    this.showModalDispatch();
    await this.waitForCloseModal();
    dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  }
  if (!dataFromCookies) {
    return;
  }

  this.waitForConfirm();

  const metaTransactionsAllowed = dataFromCookies === META_TRANSACTIONS_ALLOWED;
  const dispatcherTransactionsAllowed = dataFromCookies === DISPATCHER_TRANSACTIONS_ALLOWED;
  try {
    if (metaTransactionsAllowed) {
      const token = await this.getRecaptchaToken();
      return await this.sendMetaTransaction(
        network,
        contract,
        actor,
        action,
        data,
        confirmations,
        token,
      );
    }

    if (dispatcherTransactionsAllowed) {
      const token = await this.getRecaptchaToken();
      return await this.sendDispatcherTransaction(
        network,
        contract,
        actor,
        action,
        data,
        confirmations,
        token,
      );
    }

    await this.chainCheck(network);
    const transaction = await this[contract]
      .connect(this.provider.getSigner(actor))
      [action](...data);

    this.transactionList.push({
      action,
      transactionHash: transaction.hash,
    });
    localStorage.setItem(TRANSACTION_LIST, JSON.stringify(this.transactionList));
    this.transactionInPending(transaction.hash, this.transactionList);
    const result = await transaction.wait(confirmations);
    this.transactionList.find(
      (transactionFromList) => transactionFromList.transactionHash === transaction.hash,
    ).result = result;
    setTimeout(() => {
      const index = this.transactionList
        .map((transactionFromList) => transactionFromList.transactionHash)
        .indexOf(transaction.hash);
      if (index !== -1) {
        this.transactionList.splice(index, 1);
        this.setTransactionList(this.transactionList);
      }
    }, '30000');

    this.transactionCompleted(this.transactionList);

    return result;
  } catch (err) {
    switch (err.code) {
      case INVALID_ETHEREUM_PARAMETERS_ERROR_CODE:
        this.transactionFailed(new WebIntegrationErrorByCode(METAMASK_ERROR_CODE));
        break;
      case INVALID_MIN_RATING_ERROR_CODE:
        this.transactionFailed(new WebIntegrationErrorByCode(USER_MIN_RATING_ERROR_CODE));
        break;
      case REJECTED_SIGNATURE_REQUEST:
        this.transactionFailed(new WebIntegrationErrorByCode(err.code));
        break;
      default:
        this.transactionFailed();
        break;
    }
    throw new Error(err.message);
  }
}
