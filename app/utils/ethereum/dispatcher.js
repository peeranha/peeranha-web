import {
  ONE_MONTH,
  WEB3_TOKEN,
  WEB3_TOKEN_USER_ADDRESS,
} from 'utils/constants';
import { getCookie, setCookie } from 'utils/cookie';
import { ContractsMapping } from 'utils/ethConstants';
import {
  setTransactionResult,
  TRANSACTION_LIST,
} from 'utils/ethereum/transactionsListManagement';
import {
  BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION,
  callService,
} from 'utils/web_integration/src/util/aws-connector';
import Web3Token from 'web3-token';

export const sendDispatcherTransactionMethod = async function (
  contract,
  actor,
  action,
  data,
  confirmations,
  token,
) {
  await this.chainCheck();
  const userAddress = data.shift();

  const isWeb3Token = getCookie(WEB3_TOKEN);
  const isWeb3TokenUserAddress = getCookie(WEB3_TOKEN_USER_ADDRESS) === actor;

  if (!isWeb3Token || !isWeb3TokenUserAddress) {
    const signer = this.provider.getSigner();
    const web3token = await Web3Token.sign(
      async (msg) => await signer.signMessage(msg),
      '1d',
    );

    setCookie({
      name: WEB3_TOKEN,
      value: web3token,
      options: {
        'max-age': ONE_MONTH,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setCookie({
      name: WEB3_TOKEN_USER_ADDRESS,
      value: actor,
      options: {
        'max-age': ONE_MONTH,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
  }

  const response = await callService(
    BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION + userAddress,
    {
      contract: ContractsMapping[contract],
      action: action,
      args: data,
      reCaptchaToken: token,
      wait: false,
    },
  );

  this.transactionList.push({
    action,
    transactionHash: response.body.transactionHash,
  });

  localStorage.setItem(TRANSACTION_LIST, JSON.stringify(this.transactionList));

  if (response.errorCode) {
    throw response;
  }

  this.transactionInPending(
    response.body.transactionHash,
    this.transactionList,
  );

  const result = await this.provider.waitForTransaction(
    response.body.transactionHash,
    confirmations,
  );

  setTransactionResult(
    response,
    result,
    this.transactionList,
    this.setTransactionList,
  );

  this.transactionCompleted(this.transactionList);
  return result;
};
