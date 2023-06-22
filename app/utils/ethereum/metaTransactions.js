import { ethers } from 'ethers';
import {
  CONTRACT_COMMUNITY,
  CONTRACT_CONTENT,
  CONTRACT_TOKEN,
  CONTRACT_USER,
} from 'utils/ethConstants';

import {
  BLOCKCHAIN_SEND_META_TRANSACTION,
  callService,
} from 'utils/web_integration/src/util/aws-connector';

import PeeranhaCommunity from '../../../../peeranha-subgraph/abis/PeeranhaCommunity.json';
import PeeranhaContent from '../../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaToken from '../../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaUser from '../../../../peeranha-subgraph/abis/PeeranhaUser.json';

const CONTRACT_TO_ABI = {};
CONTRACT_TO_ABI[CONTRACT_TOKEN] = PeeranhaToken;
CONTRACT_TO_ABI[CONTRACT_USER] = PeeranhaUser;
CONTRACT_TO_ABI[CONTRACT_COMMUNITY] = PeeranhaCommunity;
CONTRACT_TO_ABI[CONTRACT_CONTENT] = PeeranhaContent;

const CONTRACT_TO_NAME = {};
CONTRACT_TO_NAME[CONTRACT_TOKEN] = 'PEER';
CONTRACT_TO_NAME[CONTRACT_USER] = 'PeeranhaUser';
CONTRACT_TO_NAME[CONTRACT_COMMUNITY] = 'PeeranhaCommunity';
CONTRACT_TO_NAME[CONTRACT_CONTENT] = 'PeeranhaContent';

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
  contract,
  actor,
  action,
  data,
  confirmations = 1,
  token,
) {
  console.log(contract, actor, action, data, token);
  await this.chainCheck();
  // use Reads contract to connect to the same provider that is used to listen for completed transactions
  const metaTxContract = this[`${contract}Reads`];
  const nonce = await metaTxContract.getNonce(actor);
  // eslint-disable-next-line no-console
  console.log(`Nonce from contract: ${nonce}`);

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
    salt: `0x${parseInt(process.env.CHAIN_ID, 10).toString(16).padStart(64, '0')}`,
  };

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
    userAddress: actor,
    functionSignature,
    sigR: r,
    sigS: s,
    sigV: v,
    wait: false,
    reCaptchaToken: token,
  });

  if (response.errorCode) {
    throw response;
  }

  this.transactionInPending(response.body.transactionHash);
  const result = await this.providerReads.waitForTransaction(
    response.body.transactionHash,
    confirmations,
  );
  this.transactionCompleted();
  this.setTransactionInitialised(false);
  return result;
}
