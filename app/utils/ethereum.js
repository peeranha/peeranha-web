import { Contract, ethers } from 'ethers';
import PeeranhaUser from '../../../peeranha-subgraph/abis/PeeranhaUser.json';
import PeeranhaToken from '../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaContent from '../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaCommunity from '../../../peeranha-subgraph/abis/PeeranhaCommunity.json';

import { WebIntegrationError, WebIntegrationErrorByCode } from './errors';
import {
  CONTRACT_TOKEN,
  CONTRACT_USER,
  CONTRACT_CONTENT,
  CONTRACT_COMMUNITY,
  CLAIM_REWARD,
  GET_COMMUNITY,
  GET_USER_BY_ADDRESS,
  SET_STAKE,
} from './ethConstants';

import { getFileUrl, getIpfsHashFromBytes32, getText } from './ipfs';
import { deleteCookie, getCookie } from './cookie';
import {
  CURRENCY,
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  INVALID_MIN_RATING_ERROR_CODE,
  META_TRANSACTIONS_ALLOWED,
  METAMASK_ERROR_CODE,
  USER_MIN_RATING_ERROR_CODE,
  RECAPTCHA_VERIFY_FAILED_CODE,
  REJECTED_SIGNATURE_REQUEST,
} from './constants';

const sigUtil = require('eth-sig-util');
const {
  callService,
  BLOCKCHAIN_SEND_META_TRANSACTION,
} = require('./web_integration/src/util/aws-connector');

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

class EthereumService {
  constructor(data) {
    this.contractToken = null;
    this.contractUser = null;
    this.contractContent = null;
    this.contractCommunity = null;

    this.provider = null;
    this.metaMaskProviderDetected = false;
    this.selectedAccount = null;

    this.connect = data.connect;
    this.disconnect = data.disconnect;
    this.connectedChain = data.connectedChain;
    this.setChain = data.setChain;
    this.wallet = null;
    this.connectedWallets = null;
    this.showModalDispatch = data.showModalDispatch;
    this.stopWaiting = null;
    this.transactionInPending = data.transactionInPendingDispatch;
    this.transactionCompleted = data.transactionCompletedDispatch;
    this.transactionFailed = data.transactionFailedDispatch;
    this.waitForConfirm = data.waitForConfirmDispatch;
    this.getRecaptchaToken = data.getRecaptchaToken;
    this.isTransactionInitialised = null;
    this.addToast = data.addToast;
  }

  setTransactionInitialised = (toggle) => {
    this.isTransactionInitialised = toggle;
  };

  setData = (data) => {
    this.wallet = data.wallet;
    this.connectedWallets = data.connectedWallets;
    this.selectedAccount = this.wallet?.accounts[0].address.toLowerCase();
    this.connectedChain = data.connectedChain;
  };

  initEthereum = async () => {
    this.provider = ethers.providers.getDefaultProvider(
      process.env.ETHEREUM_NETWORK,
    );
    this.contractUser = new Contract(
      process.env.USER_ADDRESS,
      PeeranhaUser,
      this.provider,
    );
    this.contractCommunity = new Contract(
      process.env.COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      this.provider,
    );
    this.contractContent = new Contract(
      process.env.CONTENT_ADDRESS,
      PeeranhaContent,
      this.provider,
    );
    this.contractToken = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken,
      this.provider,
    );
  };

  chainCheck = async () => {
    if (parseInt(this.connectedChain.id, 16) !== Number(process.env.CHAIN_ID)) {
      await this.setChain({
        chainId: `0x${Number(process.env.CHAIN_ID).toString(16)}`,
      });
    }
  };

  walletLogIn = async (previouslyConnectedWallet) => {
    try {
      document.getElementsByTagName('body')[0].style.position = 'fixed';
    } catch (err) {}

    if (previouslyConnectedWallet) {
      await this.connect({ autoSelect: previouslyConnectedWallet });
    } else {
      await this.connect();
    }

    if (!this.connectedWallets?.length) {
      document.getElementsByTagName('body')[0].style.position = 'relative';
      deleteCookie('connectedWallet');
      return;
    }

    await this.chainCheck();

    this.provider = new ethers.providers.Web3Provider(this.wallet.provider);
    const signer = await this.provider.getSigner();
    this.contractUser = new Contract(
      process.env.USER_ADDRESS,
      PeeranhaUser,
      signer,
    );
    this.contractCommunity = new Contract(
      process.env.COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      signer,
    );
    this.contractContent = new Contract(
      process.env.CONTENT_ADDRESS,
      PeeranhaContent,
      signer,
    );
    this.contractToken = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken,
      this.provider,
    );

    document.getElementsByTagName('body')[0].style.position = 'relative';

    return this.selectedAccount.toLowerCase();
  };

  resetWalletState = async () => {
    await this.disconnect(this.wallet);
    deleteCookie('connectedWallet');
    this.selectedAccount = null;
  };

  setSelectedAccount = (account) => {
    this.selectedAccount = account?.toLowerCase();
  };

  getSelectedAccount = () => this.selectedAccount;

  getProfile = async (userAddress) => {
    const user = await this.getUserDataWithArgs(GET_USER_BY_ADDRESS, [
      userAddress,
    ]);

    return {
      creationTime: user.creationTime,
      ipfsDoc: user.ipfsDoc,
      rating: user.rating,
      followedCommunities: user.followedCommunities,
      ipfsHash: getIpfsHashFromBytes32(user.ipfsDoc.hash),
    };
  };

  waitForCloseModal() {
    return new Promise((resolve) => {
      this.stopWaiting = function () {
        resolve();
      };
    });
  }

  sendTransaction = async (
    contract,
    actor,
    action,
    data,
    confirmations = 1,
  ) => {
    if (this.isTransactionInitialised) {
      this.addToast({
        type: 'info',
        text: 'Wait for the end of the current transaction.',
      });
      throw new Error('Wait for the end of the current transaction.');
    }

    this.setTransactionInitialised(true);
    this.waitForConfirm();

    const dataFromCookies = getCookie(META_TRANSACTIONS_ALLOWED);
    const balance = this.wallet?.accounts?.[0]?.balance?.[CURRENCY];

    if (!dataFromCookies) {
      if (Number(balance) === 0) {
        this.showModalDispatch();
        await this.waitForCloseModal();
      }
    } else if (Number(balance) > 0) {
      deleteCookie(META_TRANSACTIONS_ALLOWED);
    }

    const metaTransactionsAllowed = getCookie(META_TRANSACTIONS_ALLOWED);
    if (metaTransactionsAllowed) {
      const token = await this.getRecaptchaToken();
      return await this.sendMetaTransaction(
        contract,
        actor,
        action,
        data,
        confirmations,
        token,
      );
    }
    try {
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
          this.transactionFailed(
            new WebIntegrationErrorByCode(METAMASK_ERROR_CODE),
          );
          break;
        case INVALID_MIN_RATING_ERROR_CODE:
          this.transactionFailed(
            new WebIntegrationErrorByCode(USER_MIN_RATING_ERROR_CODE),
          );
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
  };

  getSignatureParameters = (signature) => {
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

  sendMetaTransaction = async (
    contract,
    actor,
    action,
    data,
    confirmations = 1,
    token,
  ) => {
    try {
      await this.chainCheck();
      const metaTxContract = this[contract];
      const nonce = await metaTxContract.getNonce(actor);
      const iface = new ethers.utils.Interface(CONTRACT_TO_ABI[contract]);
      const functionSignature = iface.encodeFunctionData(action, data);
      const message = {};
      message.nonce = parseInt(nonce);
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
        salt: `0x${parseInt(process.env.CHAIN_ID, 10)
          .toString(16)
          .padStart(64, '0')}`,
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

      const signature = await this.provider.send('eth_signTypedData_v4', [
        actor,
        dataToSign,
      ]);

      const { r, s, v } = this.getSignatureParameters(signature);

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
      const result = await this.provider.waitForTransaction(
        response.body.transactionHash,
        confirmations,
      );
      this.transactionCompleted();
      this.setTransactionInitialised(false);
      return result;
    } catch (err) {
      const errorCode = err.code || err.errorCode;
      this.setTransactionInitialised(false);
      switch (errorCode) {
        case INVALID_ETHEREUM_PARAMETERS_ERROR_CODE:
          this.transactionFailed(
            new WebIntegrationErrorByCode(METAMASK_ERROR_CODE),
          );
          break;
        case REJECTED_SIGNATURE_REQUEST:
          this.transactionFailed(new WebIntegrationErrorByCode(errorCode));
          break;
        case RECAPTCHA_VERIFY_FAILED_CODE:
          this.transactionFailed(new WebIntegrationErrorByCode(errorCode));
          break;
        default:
          this.transactionFailed();
          break;
      }
    }
  };

  getUserDataWithArgs = async (action, args) =>
    await this.contractUser[action](...args);

  getCommunityDataWithArgs = async (action, args) =>
    await this.contractCommunity[action](...args);

  getContentDataWithArgs = async (action, args) =>
    await this.contractContent[action](...args);

  getTokenDataWithArgs = async (action, args) =>
    await this.contractToken[action](...args);

  getCommunityFromContract = async (id) => {
    const rawCommunity = await this.getCommunityDataWithArgs(GET_COMMUNITY, [
      id,
    ]);
    const communityInfo = JSON.parse(
      await getText(getIpfsHashFromBytes32(rawCommunity.ipfsDoc.hash)),
    );
    return {
      id: +id,
      name: communityInfo.name,
      avatar: communityInfo.avatar.imgUrl || getFileUrl(communityInfo.avatar),
      description: communityInfo.description,
      website: communityInfo.website,
      language: communityInfo.language,
      creationTime: rawCommunity.timeCreate,
      isFrozen: rawCommunity.isFrozen,
      value: +id,
    };
  };
}

export default EthereumService;
