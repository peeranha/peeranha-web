import ReactGA from 'react-ga4';
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
import { POST_QUESTION } from 'utils/queries/constants';
import { setTransactionResult, writeTransactionList } from 'utils/transactionsListManagement';
import {
  callService,
  OPTIMISTIC_TRANSACTION_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';

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
  const pendingTransactionAmount =
    this.transactionList?.filter((transaction) => !transaction.result).length || 0;
  if (pendingTransactionAmount) {
    this.currentTransactionAmount += 1;
    await new Promise((resolve) =>
      setTimeout(resolve, this.currentTransactionAmount * 2000 + 2000),
    );
  } else {
    this.currentTransactionAmount = 0;
  }

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

    console.log('Transaction hash: ', transaction.hash);
    const timestamp = Date.now();
    console.log('Timestamp:', timestamp);

    this.transactionList.push({
      action,
      transactionHash: transaction.hash,
      network,
    });
    this.setTransactionList(this.transactionList);
    writeTransactionList(this.transactionList, 10);

    await processOptimisticTransaction(action, transaction.hash, transaction.chainId, network);

    this.transactionInPending(transaction.hash, this.transactionList);
    const result = await transaction.wait(confirmations);
    setTransactionResult(transaction.hash, result, this.transactionList, this.setTransactionList);

    this.transactionCompleted(this.transactionList);
    ReactGA.event({
      category: 'Users',
      action: 'fullControl_transaction_completed',
    });
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
    console.log(err);
    throw new Error(err.message);
  }
}

const OPTIMISTIC_ACTIONS = [POST_QUESTION];

export async function processOptimisticTransaction(action, transactionHash, chainId, network) {
  if (OPTIMISTIC_ACTIONS.some((actionName) => actionName === action) !== -1 && transactionHash) {
    console.log(`Transaction with hash ${transactionHash} for optimistic action ${action} created`);
    await callService(OPTIMISTIC_TRANSACTION_SERVICE, {
      transactionHash,
      chainId,
    });
    console.log(
      `Call to api completed for optimistic action ${action} with hash ${transactionHash}`,
    );
  }
  return true;
}
