import { ethers } from 'ethers';
import {
  CONTRACT_COMMUNITY,
  CONTRACT_CONTENT,
  CONTRACT_TOKEN,
  CONTRACT_USER,
  ContractsMapping,
} from 'utils/ethConstants';

import { TRANSACTION_LIST } from 'utils/ethereum/transactionsListManagement';
import {
  BLOCKCHAIN_SEND_META_TRANSACTION,
  callService,
} from 'utils/web_integration/src/util/aws-connector';

import PeeranhaCommunity from '../../../../peeranha-subgraph/abis/PeeranhaCommunity.json';
import PeeranhaContent from '../../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaToken from '../../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaUser from '../../../../peeranha-subgraph/abis/PeeranhaUser.json';

const CONTRACT_TO_ABI = {};
const CONTRACT_TO_NAME = {};

const processContracts = (aggregator, contractList, contractType) => {
  contractList.forEach((contractName) => {
    aggregator[contractName] = contractType;
  });
};

processContracts(CONTRACT_TO_ABI, CONTRACT_TOKEN, PeeranhaToken);
processContracts(CONTRACT_TO_ABI, CONTRACT_USER, PeeranhaUser);
processContracts(CONTRACT_TO_ABI, CONTRACT_COMMUNITY, PeeranhaCommunity);
processContracts(CONTRACT_TO_ABI, CONTRACT_CONTENT, PeeranhaContent);

processContracts(CONTRACT_TO_NAME, CONTRACT_TOKEN, 'PEER');
processContracts(CONTRACT_TO_NAME, CONTRACT_USER, 'PeeranhaUser');
processContracts(CONTRACT_TO_NAME, CONTRACT_COMMUNITY, 'PeeranhaCommunity');
processContracts(CONTRACT_TO_NAME, CONTRACT_CONTENT, 'PeeranhaContent');

const getSignatureParameters = (signature) => {
  const r = signature.slice(0, 66);
  const s = '0x'.concat(signature.slice(66, 130));
  let v = '0x'.concat(signature.slice(130, 132));
  v = parseInt(v, 16);
  if (![27, 28].includes(v)) v += 27;
  return {
    r,
    s,
    v,
  };
};

export async function sendMetaTransactionMethod(
  network,
  contract,
  actor,
  action,
  data,
  confirmations = 1,
  token,
) {
  await this.chainCheck(network);
  const metaTxContract = this[`${contract}Reads`];
  let nonce = await metaTxContract.getNonce(actor);
  console.log(`Nonce from contract: ${nonce}`);

  if (nonce.lte(this.previousNonce)) {
    nonce = this.previousNonce.add(1);
    this.previousNonce = nonce;
  } else {
    this.previousNonce = nonce;
  }

  const iface = new ethers.utils.Interface(CONTRACT_TO_ABI[contract]);
  const functionSignature = iface.encodeFunctionData(action, data);
  const message = {};
  message.nonce = parseInt(nonce, 10);
  message.from = actor;
  message.functionSignature = functionSignature;

  const domainType = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'verifyingContract', type: 'address' },
    { name: 'salt', type: 'bytes32' },
  ];

  const metaTransactionType = [
    { name: 'nonce', type: 'uint256' },
    { name: 'from', type: 'address' },
    { name: 'functionSignature', type: 'bytes' },
  ];

  const domainData = {
    name: CONTRACT_TO_NAME[contract],
    version: '1',
    verifyingContract: metaTxContract.address,
    salt: `0x${parseInt(this.CHAIN_IDS[Number(network)], 10).toString(16).padStart(64, '0')}`,
  };
  console.log(domainData);
  const dataToSign = JSON.stringify({
    types: {
      EIP712Domain: domainType,
      MetaTransaction: metaTransactionType,
    },
    domain: domainData,
    primaryType: 'MetaTransaction',
    message,
  });

  const signature = await this.provider.send('eth_signTypedData_v4', [actor, dataToSign]);

  const { r, s, v } = getSignatureParameters(signature);

  const response = await callService(BLOCKCHAIN_SEND_META_TRANSACTION, {
    contractAddress: metaTxContract.address,
    contractName: ContractsMapping[contract][0],
    userAddress: actor,
    functionSignature,
    sigR: r,
    sigS: s,
    sigV: v,
    wait: false,
    reCaptchaToken: token,
    network: network + 1,
  });

  this.transactionList.push({
    action,
    transactionHash: response.body.transactionHash,
  });

  localStorage.setItem(TRANSACTION_LIST, JSON.stringify(this.transactionList));

  if (response.errorCode) {
    throw response;
  }

  this.transactionInPending(response.body.transactionHash, this.transactionList);
  const result = await this.providerReads.waitForTransaction(
    response.body.transactionHash,
    confirmations,
  );
  const pendingTransaction = this.transactionList.find(
    (transactionFromList) => transactionFromList.transactionHash === response.body.transactionHash,
  );
  if (pendingTransaction) {
    pendingTransaction.result = result;
  }
  localStorage.setItem(TRANSACTION_LIST, JSON.stringify(this.transactionList));
  setTimeout(() => {
    const index = this.transactionList
      .map((transactionFromList) => transactionFromList.transactionHash)
      .indexOf(response.body.transactionHash);
    if (index !== -1) {
      this.transactionList.splice(index, 1);
      this.setTransactionList(this.transactionList);
      localStorage.setItem(TRANSACTION_LIST, JSON.stringify(this.transactionList));
    }
  }, 30000);

  this.transactionCompleted(this.transactionList);
  return result;
}
