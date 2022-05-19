import { Contract, ethers } from 'ethers';
import PeeranhaUser from '../../../peeranha-subgraph/abis/PeeranhaUser.json';
import PeeranhaToken from '../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaContent from '../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaCommunity from '../../../peeranha-subgraph/abis/PeeranhaCommunity.json';

import { WebIntegrationErrorByCode } from './errors';
import {
  CONTRACT_TOKEN,
  CONTRACT_USER,
  CONTRACT_CONTENT,
  CONTRACT_COMMUNITY,
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
} from './ethConstants';

import {
  CLAIM_REWARD,
  GET_COMMUNITY,
  GET_USER_BY_ADDRESS,
  SET_STAKE,
} from './ethConstants';
import { getFileUrl, getIpfsHashFromBytes32, getText } from './ipfs';
import { deleteCookie, getCookie, setCookie } from './cookie';
import { CURRENCY, META_TRANSACTIONS_ALLOWED } from './constants';

const {
  callService,
  BLOCKCHAIN_SEND_META_TRANSACTION,
} = require('./web_integration/src/util/aws-connector');

let sigUtil = require('eth-sig-util');

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
  }

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
    document.getElementsByTagName('body')[0].style.position = 'fixed';

    if (previouslyConnectedWallet) {
      await this.connect({ autoSelect: previouslyConnectedWallet });
    } else {
      await this.connect();
    }

    if (!this.connectedWallets?.length) {
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
    window.localStorage.removeItem('connectedWallet');
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

  sendTransaction = async (contract, actor, action, data) => {
    // const dataFromCookies = getCookie(META_TRANSACTIONS_ALLOWED);
    const balance = this.wallet?.accounts?.[0]?.balance?.[CURRENCY];
    // if (!dataFromCookies) {
    //   if (Number(balance) === 0) {
    //     //TODO popup
    //     setCookie({
    //       name: META_TRANSACTIONS_ALLOWED,
    //       value: true,
    //       options: {
    //         neverExpires: true,
    //         defaultPath: true,
    //         allowSubdomains: true,
    //       },
    //     });
    //   }
    // } else {
    //   if (Number(balance) > 0) {
    //     deleteCookie(META_TRANSACTIONS_ALLOWED);
    //   }
    // }

    // const metaTransactionsAllowed = getCookie(META_TRANSACTIONS_ALLOWED);
    if (balance < 0.001) {
      return await this.sendMetaTransaction(contract, actor, action, data);
    } else {
      try {
        await this.chainCheck();
        const transaction = await this[contract]
          .connect(this.provider.getSigner(actor))
          [action](...data);
        return await transaction.wait();
      } catch (err) {
        switch (err.code) {
          case INVALID_ETHEREUM_PARAMETERS_ERROR_CODE:
            throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
          case REJECTED_SIGNATURE_REQUEST:
            throw new WebIntegrationErrorByCode(err.code);
          default:
            throw err;
        }
      }
    }
  };

  getSignatureParameters = (signature) => {
    var r = signature.slice(0, 66);
    var s = '0x'.concat(signature.slice(66, 130));
    var v = '0x'.concat(signature.slice(130, 132));
    v = parseInt(v, 16);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v,
    };
  };

  sendMetaTransaction = async (contract, actor, action, data) => {
    try {
      await this.chainCheck();
      const metaTxContract = this[contract];
      const nonce = await metaTxContract.getNonce(actor);
      let iface = new ethers.utils.Interface(CONTRACT_TO_ABI[contract]);
      const functionSignature = iface.encodeFunctionData(action, data);
      let message = {};
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

      let domainData = {
        name: CONTRACT_TO_NAME[contract],
        version: '1',
        verifyingContract: metaTxContract.address,
        salt:
          '0x' +
          parseInt(process.env.CHAIN_ID, 10).toString(16).padStart(64, '0'),
      };

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: 'MetaTransaction',
        message: message,
      });

      let signature = await this.provider.send('eth_signTypedData_v4', [
        actor,
        dataToSign,
      ]);
      console.log('Signature: ' + signature);

      const recovered = sigUtil.recoverTypedSignature_v4({
        data: JSON.parse(dataToSign),
        sig: signature,
      });

      let { r, s, v } = this.getSignatureParameters(signature);

      const response = await callService(BLOCKCHAIN_SEND_META_TRANSACTION, {
        contractAddress: metaTxContract.address,
        userAddress: actor,
        functionSignature,
        sigR: r,
        sigS: s,
        sigV: v,
        wait: false,
      });

      return await this.provider.waitForTransaction(
        response.body.transactionHash,
      );
    } catch (err) {
      switch (err.code) {
        case INVALID_ETHEREUM_PARAMETERS_ERROR_CODE:
          throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
        case REJECTED_SIGNATURE_REQUEST:
          throw new WebIntegrationErrorByCode(err.code);
        default:
          throw err;
      }
    }
  };

  getUserDataWithArgs = async (action, args) => {
    return await this.contractUser[action](...args);
  };
  getCommunityDataWithArgs = async (action, args) => {
    return await this.contractCommunity[action](...args);
  };
  getContentDataWithArgs = async (action, args) => {
    return await this.contractContent[action](...args);
  };
  getTokenDataWithArgs = async (action, args) => {
    return await this.contractToken[action](...args);
  };

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

  setStake = async (actor, tokens) => {
    try {
      const transaction = await this.contractToken
        .connect(this.provider.getSigner(actor))
        [SET_STAKE](actor, tokens);
      await transaction.wait();
    } catch (err) {
      throw err;
    }
  };

  claimUserReward = async (actor, period) => {
    try {
      await this.chainCheck();
      const transaction = await this.contractToken
        .connect(this.provider.getSigner(actor))
        [CLAIM_REWARD](actor, period);
      await transaction.wait();
    } catch (err) {
      throw err;
    }
  };
}

export default EthereumService;
