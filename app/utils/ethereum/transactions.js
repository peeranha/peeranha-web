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

export async function sendTransactionMethod(contract, actor, action, data, confirmations = 1) {
  let dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  console.log(this);
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
  if (this.isTransactionInitialised) {
    this.addToast({
      type: 'info',
      text: 'Wait for the end of the current transaction.',
    });
    throw new Error('Wait for the end of the current transaction.');
  }

  this.setTransactionInitialised(true);
  this.waitForConfirm();

  const metaTransactionsAllowed = dataFromCookies === META_TRANSACTIONS_ALLOWED;
  const dispatcherTransactionsAllowed = dataFromCookies === DISPATCHER_TRANSACTIONS_ALLOWED;
  try {
    if (metaTransactionsAllowed) {
      const token = await this.getRecaptchaToken();
      return await this.sendMetaTransaction(contract, actor, action, data, confirmations, token);
    }

    if (dispatcherTransactionsAllowed) {
      const token = await this.getRecaptchaToken();
      return await this.sendDispatcherTransaction(
        contract,
        actor,
        action,
        data,
        confirmations,
        token,
      );
    }

    await this.chainCheck();
    const transaction = await this[contract]
      .connect(this.provider.getSigner(actor))
      [action](...data);
    this.transactionInPending(transaction.hash);
    const result = await transaction.wait(confirmations);
    this.transactionCompleted();
    this.setTransactionInitialised(false);
    return result;
  } catch (err) {
    this.setTransactionInitialised(false);

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
