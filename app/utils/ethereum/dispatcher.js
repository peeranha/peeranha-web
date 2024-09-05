import ReactGA from 'react-ga4';
import { ONE_MONTH, WEB3_TOKEN, WEB3_TOKEN_USER_ADDRESS } from 'utils/constants';
import { getCookie, setCookie } from 'utils/cookie';
import { ContractsMapping } from 'utils/queries/constants';
import { setTransactionResult, writeTransactionList } from 'utils/transactionsListManagement';
import Web3Token from 'web3-token';
import {
  BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION,
  callService,
} from '../web_integration/src/util/aws-connector';
import { processOptimisticTransaction } from 'utils/ethereum/transactions';

export async function sendDispatcherTransactionMethod(
  network,
  contract,
  actor,
  action,
  data,
  confirmations = 1,
  token,
) {
  const userAddress = data.shift();
  this.transactionList.push({
    action,
    transactionHash: JSON.stringify([data, action]),
    network,
  });
  this.setTransactionList(this.transactionList);

  const isWeb3Token = getCookie(WEB3_TOKEN);
  const isWeb3TokenUserAddress = getCookie(WEB3_TOKEN_USER_ADDRESS) === actor;

  if (!isWeb3Token || !isWeb3TokenUserAddress) {
    const signer = this.provider.getSigner();
    const web3token = await Web3Token.sign(async (msg) => signer.signMessage(msg), {
      uri: 'https://peeranha.io/',
      domain: 'peeranha.io',
      web3tokenversion: '1',
      statement: 'I allow Peeranha to sign transactions on my behalf for 30 days.',
      expires_in: '30d',
    });

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

  const response = await callService(BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION + userAddress, {
    contractName: ContractsMapping[contract][0],
    contractAddress: ContractsMapping[contract][1],
    action,
    args: data,
    reCaptchaToken: token,
    wait: false,
    network: Number(network) + 1,
  });

  const pendingTransaction = this.transactionList.find(
    (transactionFromList) => transactionFromList.transactionHash === JSON.stringify([data, action]),
  );
  if (pendingTransaction) {
    if (response?.body?.transactionHash) {
      pendingTransaction.transactionHash = response.body.transactionHash;
      writeTransactionList(this.transactionList, 4);
      console.log('Transaction hash: ', response.body.transactionHash);
      const timestamp = Date.now();
      console.log('Timestamp:', timestamp);
    } else {
      pendingTransaction.result = { status: 2 };
    }
  }

  this.setTransactionList(this.transactionList);

  if (response.errorCode) {
    throw response;
  }

  await processOptimisticTransaction(action, response.body.transactionHash, network);

  this.transactionInPending(response.body.transactionHash, this.transactionList);

  const result = await this[this.providerForWaiting[Number(network)]].waitForTransaction(
    response.body.transactionHash,
    confirmations,
  );

  setTransactionResult(
    response.body.transactionHash,
    result,
    this.transactionList,
    this.setTransactionList,
  );

  this.transactionCompleted(this.transactionList);
  ReactGA.event({
    category: 'Users',
    action: 'dispatcher_transaction_completed',
  });
  return result;
}
