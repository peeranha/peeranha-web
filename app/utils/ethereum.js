import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import Peeranha from '../../../peeranha/artifacts/contracts/Peeranha.sol/Peeranha.json';
import PeeranhaToken from '../../../peeranha/artifacts/contracts/PeeranhaToken.sol/PeeranhaToken.json';
import { WebIntegrationErrorByCode } from './errors';
import {
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
} from './constants';
import { getCookie } from './cookie';
import { AUTOLOGIN_DATA } from '../containers/Login/constants';
import {
  CLAIM_REWARD,
  GET_COMMUNITY,
  GET_TAGS,
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
import {
  BLOCKCHAIN_MAIN_SEND_TRANSACTION,
  callService,
} from './web_integration/src/util/aws-connector';

class EthereumService {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.initialized = false;
    this.metaMaskUserAddress = null;
    this.withMetaMask = false;
    this.metaMaskProviderDetected = false;
    this.selectedAccount = null;
    this.contractToken = null;

    this.web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
    });
  }

  getProviderOptions = () => {
    const infuraId = '8354e9750bad49ec84592ea9ab45a794';
    return {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId,
        },
      },
      torus: {
        package: Torus,
      },
    };
  };

  handleAccountsChanged = accounts => {
    if (accounts.length === 0) {
      throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
    } else if (this.selectedAccount !== accounts[0]) {
      this.selectedAccount = accounts[0];
    }
  };

  initEthereum = async () => {
    // TODO for maatic:
    // ETHEREUM_NETWORK='https://rpc-mumbai.maticvigil.com'
    if (this.web3Modal.cachedProvider) {
      this.provider = await this.web3Modal.connect();
      this.selectedAccount = this.provider.selectedAddress;
      this.withMetaMask = true;
      this.metaMaskProviderDetected = true;
      this.initialized = true;

      this.contract = new Contract(
        process.env.ETHEREUM_ADDRESS,
        Peeranha.abi,
        new ethers.providers.Web3Provider(this.provider),
      );
      this.contractToken = new Contract(
        process.env.PEERANHA_TOKEN,
        PeeranhaToken.abi,
        new ethers.providers.Web3Provider(this.provider),
      );
    } else {
      this.initialized = true;
      this.provider = ethers.providers.getDefaultProvider(
        process.env.ETHEREUM_NETWORK,
      );
      this.contract = new Contract(
        process.env.ETHEREUM_ADDRESS,
        Peeranha.abi,
        this.provider,
      );
      this.contractToken = new Contract(
        process.env.PEERANHA_TOKEN,
        PeeranhaToken.abi,
        this.provider,
      );
    }
    this.provider.on('accountsChanged', accounts => {
      console.log(accounts);
    });
  };

  metaMaskSignIn = async () => {
    this.provider = await this.web3Modal.connect();
    await this.provider.enable();
    this.withMetaMask = true;
    this.selectedAccount = this.provider.selectedAddress;
    this.contract = new Contract(
      process.env.ETHEREUM_ADDRESS,
      Peeranha.abi,
      new ethers.providers.Web3Provider(this.provider).getSigner(),
    );
    return this.provider.selectedAddress;
  };

  resetWeb3Modal = async () => {
    this.web3Modal.clearCachedProvider();
    this.wasReseted = true;
    this.metaMaskUserAddress = null;
    this.withMetaMask = false;
    this.selectedAccount = null;
  };

  setSelectedAccount = account => {
    this.selectedAccount = account?.toLowerCase();
  };

  getSelectedAccount = async () =>
    this.selectedAccount ||
    JSON.parse(getCookie(AUTOLOGIN_DATA) || null) ||
    null;

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
    if (this.withMetaMask) {
      try {
        const transaction = await this.contract
          .connect(
            new ethers.providers.Web3Provider(this.provider).getSigner(actor),
          )
          [action](actor, ...data);
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
    } else {
      const transactionResult = await callService(
        BLOCKCHAIN_MAIN_SEND_TRANSACTION,
        {
          action,
          args: [actor, ...data],
        },
      );

      return transactionResult;
    }
  };

  sendTransactionWithoutDelegating = async (actor, action, data) => {
    if (this.withMetaMask) {
      try {
        const transaction = await this.contract
          .connect(
            new ethers.providers.Web3Provider(this.provider).getSigner(actor),
          )
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
    } else {
      const transactionResult = await callService(
        BLOCKCHAIN_MAIN_SEND_TRANSACTION,
        {
          action,
          args: [...data],
        },
      );

      return transactionResult;
    }
  };

  sendTransaction = async (actor, action, data) => {
    try {
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

  getTagsFromContract = async communityId => {
    const rawTags = await this.getDataWithArgs(GET_TAGS, [communityId]);
    return await Promise.all(
      rawTags.map(async rawTag => {
        const tag = JSON.parse(
          await getText(getIpfsHashFromBytes32(rawTag.ipfsDoc.hash)),
        );
        return {
          name: tag.name,
          description: tag.description,
          postCount: 0,
        };
      }),
    );
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

  getCommunities = async count => {
    const communities = [];
    for (let i = 1; i <= count; i++) {
      communities.push(await this.getCommunityFromContract(i));
    }
    return communities;
  };

  getUserRating = async (user, communityId) =>
    await this.getDataWithArgs(GET_USER_RATING, [user, communityId]);

  getUserBalance = async user =>
    await this.getTokenDataWithArgs(GET_USER_BALANCE, [user]);

  claimUserReward = async (actor, period) => {
    try {
      const transaction = await this.contractToken
        .connect(
          new ethers.providers.Web3Provider(this.provider).getSigner(actor),
        )
        [CLAIM_REWARD](actor, period);
      await transaction.wait();
    } catch (err) {
      throw err;
    }
  };
}

export default EthereumService;
