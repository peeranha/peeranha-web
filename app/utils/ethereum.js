import { Contract, ethers } from 'ethers';
import Peeranha from '../../../peeranha-subgraph/abis/Peeranha.json';
import PeeranhaToken from '../../../peeranha/artifacts/contracts/PeeranhaToken.sol/PeeranhaToken.json';
import { WebIntegrationErrorByCode } from './errors';
import {
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
} from './constants';

import {
  CLAIM_REWARD,
  GET_COMMUNITY,
  GET_USER_BALANCE,
  GET_USER_BY_ADDRESS,
  GET_USER_PERMISSIONS,
  GET_USER_RATING,
} from './ethConstants';
import {
  getBytes32FromIpfsHash,
  getFileUrl,
  getIpfsHashFromBytes32,
  getText,
} from './ipfs';

const {
  callService,
  BLOCKCHAIN_SEND_META_TRANSACTION,
} = require('./web_integration/src/util/aws-connector');

let sigUtil = require('eth-sig-util');

class EthereumService {
  constructor(data) {
    this.contract = null;
    this.provider = null;
    this.metaMaskProviderDetected = false;
    this.selectedAccount = null;
    this.contractToken = null;

    this.connect = data.connect;
    this.disconnect = data.disconnect;
    this.connectedChain = data.connectedChain;
    this.setChain = data.setChain;
    this.wallet = null;
    this.connectedWallets = null;
  }

  setData = data => {
    this.wallet = data.wallet;
    this.connectedWallets = data.connectedWallets;
    this.selectedAccount = this.wallet?.accounts[0].address.toLowerCase();
    this.connectedChain = data.connectedChain;
  };

  initEthereum = async () => {
    this.provider = ethers.providers.getDefaultProvider(
      process.env.ETHEREUM_NETWORK,
    );
    this.contract = new Contract(
      process.env.ETHEREUM_ADDRESS,
      Peeranha,
      this.provider,
    );
    this.contractToken = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken.abi,
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

  walletLogIn = async previouslyConnectedWallet => {
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
    this.contract = new Contract(
      process.env.ETHEREUM_ADDRESS,
      Peeranha,
      signer,
    );
    this.contractToken = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken.abi,
      this.provider,
    );
    return this.selectedAccount.toLowerCase();
  };

  resetWalletState = async () => {
    await this.disconnect(this.wallet);
    window.localStorage.removeItem('connectedWallet');
    this.selectedAccount = null;
  };

  setSelectedAccount = account => {
    this.selectedAccount = account?.toLowerCase();
  };

  getSelectedAccount = () => this.selectedAccount;

  getProfile = async userAddress => {
    const user = await this.getDataWithArgs(GET_USER_BY_ADDRESS, [userAddress]);

    const permissions = await this.getDataWithArgs(GET_USER_PERMISSIONS, [
      userAddress,
    ]);

    return {
      creationTime: user.creationTime,
      ipfsDoc: user.ipfsDoc,
      rating: user.rating,
      permissions,
      followedCommunities: user.followedCommunities,
      ipfsHash: getIpfsHashFromBytes32(user.ipfsDoc.hash),
    };
  };

  sendTransactionWithSigner = async (actor, action, data) => {
    // if (this.withMetaMask) {
    try {
      await this.chainCheck();
      const transaction = await this.contract
        .connect(this.provider.getSigner(actor))
        [action](actor, ...data);
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
    // } else {
    //   return await callService(BLOCKCHAIN_MAIN_SEND_TRANSACTION, {
    //     action,
    //     args: [actor, ...data],
    //   });
    // }
  };

  getSignatureParameters = signature => {
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

  sendMetaTransaction = async (actor, action, data) => {
    try {
      await this.chainCheck();
      const nonce = await this.contract.getNonce(actor);
      console.log('nonce: ' + nonce);
      let iface = new ethers.utils.Interface(Peeranha);
      const functionSignature = iface.encodeFunctionData(
        action,
        [actor].concat(data),
      );
      console.log('Func sign: ' + functionSignature);

      let message = {};
      message.nonce = parseInt(nonce);
      message.from = actor;
      message.functionSignature = functionSignature;

      const domainType = [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ];

      const metaTransactionType = [
        { name: 'nonce', type: 'uint256' },
        { name: 'from', type: 'address' },
        { name: 'functionSignature', type: 'bytes' },
      ];

      let domainData = {
        name: 'Peeranha',
        version: '1',
        verifyingContract: this.contract.address,
        chainId: parseInt(process.env.CHAIN_ID, 10),
      };

      console.log(`Domain data: $${JSON.stringify(domainData)}`);

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

      console.log(`Original ${actor}, Recovered ${recovered}`);

      let { r, s, v } = this.getSignatureParameters(signature);

      console.log('Endpoint - ' + BLOCKCHAIN_SEND_META_TRANSACTION);

      const response = await callService(BLOCKCHAIN_SEND_META_TRANSACTION, {
        userAddress: actor,
        functionSignature,
        sigR: r,
        sigS: s,
        sigV: v,
      });

      console.log(`Response - ${JSON.stringify(response)}`);
      return response;
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

  sendTransactionWithoutDelegating = async (actor, action, data) => {
    // if (this.withMetaMask) {
    try {
      await this.chainCheck();
      const transaction = await this.contract
        .connect(this.provider.getSigner(actor))
        [action](...data);
      await transaction.wait();
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
    // } else {
    //   return await callService(BLOCKCHAIN_MAIN_SEND_TRANSACTION, {
    //     action,
    //     args: [...data],
    //   });
    // }
  };

  sendTransaction = async (actor, action, data) => {
    try {
      await this.chainCheck();
      const transactionData = getBytes32FromIpfsHash(data);
      const transaction = await this.getDataWithArgs(action, [transactionData]);
      await transaction.wait();
    } catch (err) {
      if (err.code === INVALID_ETHEREUM_PARAMETERS_ERROR_CODE) {
        throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
      } else throw err;
    }
  };

  getData = async action => {
    return await this.contract[action]();
    // if (this.withMetaMask) {
    //   return await this.contract[action]();
    // }
    //
    // return await callService(BLOCKCHAIN_MAIN_CALL, {
    //   action,
    //   args: [],
    // });
  };

  getDataWithArgs = async (action, args) => {
    return await this.contract[action](...args);
    // if (this.withMetaMask) {
    //   return await this.contract[action](...args);
    // }
    //
    // const contractResult = await callService(BLOCKCHAIN_MAIN_CALL, {
    //   action,
    //   args: [...args],
    // });
    //
    // return contractResult.body?.json;
  };

  getTokenDataWithArgs = async (action, args) => {
    return await this.contractToken[action](...args);
    // if (this.withMetaMask) {
    //   return await this.contractToken[action](...args);
    // }
    //
    // const contractResult = await callService(BLOCKCHAIN_TOKEN_CALL, {
    //   action,
    //   args: [...args],
    // });
    //
    // return contractResult.body?.json;
  };

  getCommunityFromContract = async id => {
    const rawCommunity = await this.getDataWithArgs(GET_COMMUNITY, [id]);
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

  getUserRating = async (user, communityId) =>
    await this.getDataWithArgs(GET_USER_RATING, [user, communityId]);

  getUserBalance = async user =>
    await this.getTokenDataWithArgs(GET_USER_BALANCE, [user]);

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
