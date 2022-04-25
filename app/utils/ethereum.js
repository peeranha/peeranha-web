import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import Fortmatic from 'fortmatic';
import Peeranha from '../../../peeranha/artifacts/contracts/Peeranha.sol/Peeranha.json';
import PeeranhaToken from '../../../peeranha/artifacts/contracts/PeeranhaToken.sol/PeeranhaToken.json';
import {
  ApplicationError,
  WebIntegrationError,
  WebIntegrationErrorByCode,
} from './errors';
import {
  CHAIN_ID_ERROR_CODE,
  ETHEREUM_USER_ERROR_CODE,
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
  USER_NOT_SELECTED_ERROR_CODE,
} from './constants';
import { getCookie } from './cookie';
import { AUTOLOGIN_DATA } from '../containers/Login/constants';
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
import {
  BLOCKCHAIN_MAIN_SEND_TRANSACTION,
  callService,
} from './web_integration/src/util/aws-connector';

class EthereumService {
  constructor() {
    this.contract = null;
    this.instance = null;
    this.provider = null;
    this.initialized = false;
    this.metaMaskUserAddress = null;
    this.withMetaMask = false;
    this.metaMaskProviderDetected = false;
    this.selectedAccount = null;
    this.contractToken = null;
    this.correctChainId = false;

    this.web3Modal = new Web3Modal({
      network: process.env.ETHEREUM_NETWORK,
      cacheProvider: false,
      providerOptions: this.getProviderOptions(),
    });
  }

  getProviderOptions = () => {
    const infuraId = process.env.INFURA_API_KEY;
    return {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId,
        },
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            host: 'mumbai', // Make it configurable
            chainId: process.env.CHAIN_ID,
            networkId: process.env.CHAIN_ID,
          },
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: process.env.FORMATIC_API_KEY,
          network: {
            rpcUrl: process.env.ETHEREUM_NETWORK,
            chainId: process.env.CHAIN_ID,
          },
        },
      },
    };
  };

  initWithWeb3Modal = async () => {
    this.instance = await this.web3Modal.connect();
    this.provider = new ethers.providers.Web3Provider(this.instance);
    await this.subscribeProvider();

    this.selectedAccount = this.provider.selectedAddress;

    this.withMetaMask = true;
    this.metaMaskProviderDetected = true;
    this.initialized = true;

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
  };

  subscribeProvider = async () => {
    if (!this.instance.isFortmatic) {
      this.instance.on('accountsChanged', accounts => {
        this.selectedAccount = accounts[0];
      });
      this.instance.on('chainChanged', async chainId => {
        this.correctChainId = Number(chainId) === Number(process.env.CHAIN_ID);
      });
    }
  };

  handleAccountsChanged = accounts => {
    if (accounts.length === 0) {
      throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
    } else if (this.selectedAccount !== accounts[0]) {
      this.selectedAccount = accounts[0];
    }
  };

  initEthereum = async () => {
    if (this.web3Modal.cachedProvider) {
      await this.initWithWeb3Modal();
      const chainId = (await this.provider.getNetwork()).chainId;
      this.correctChainId = chainId === Number(process.env.CHAIN_ID);
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
  };

  metaMaskSignIn = async () => {
    this.instance = await this.web3Modal.connect();
    await this.subscribeProvider();
    await this.instance.enable();
    this.withMetaMask = true;

    if (this.instance.isMetaMask) {
      await this.instance
        .request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .catch(() => {
          throw new WebIntegrationErrorByCode(USER_NOT_SELECTED_ERROR_CODE);
        });
      await this.instance
        .request({ method: 'eth_requestAccounts' })
        .then(this.handleAccountsChanged)
        .catch(() => {
          throw new WebIntegrationErrorByCode(ETHEREUM_USER_ERROR_CODE);
        });
    }

    this.provider = await new ethers.providers.Web3Provider(this.instance);
    const chainId = (await this.provider.getNetwork()).chainId;
    this.correctChainId = Number(chainId) === Number(process.env.CHAIN_ID);
    if (!this.correctChainId) {
      throw new WebIntegrationErrorByCode(CHAIN_ID_ERROR_CODE);
    }

    const signer = await this.provider.getSigner();
    this.contract = new Contract(
      process.env.ETHEREUM_ADDRESS,
      Peeranha.abi,
      signer,
    );
    this.contractToken = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken.abi,
      this.provider,
    );

    this.selectedAccount = await signer.getAddress();

    return this.selectedAccount;
  };

  resetWeb3Modal = async () => {
    await this.web3Modal.clearCachedProvider();
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
    if (!this.correctChainId) {
      throw new WebIntegrationErrorByCode(CHAIN_ID_ERROR_CODE);
    }
    if (this.withMetaMask) {
      try {
        const transaction = await this.contract
          .connect(this.provider.getSigner(actor))
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
      return await callService(BLOCKCHAIN_MAIN_SEND_TRANSACTION, {
        action,
        args: [actor, ...data],
      });
    }
  };

  sendTransactionWithoutDelegating = async (actor, action, data) => {
    if (!this.correctChainId) {
      throw new WebIntegrationErrorByCode(CHAIN_ID_ERROR_CODE);
    }
    if (this.withMetaMask) {
      try {
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
    } else {
      return await callService(BLOCKCHAIN_MAIN_SEND_TRANSACTION, {
        action,
        args: [...data],
      });
    }
  };

  sendTransaction = async (actor, action, data) => {
    if (!this.correctChainId) {
      throw new WebIntegrationErrorByCode(CHAIN_ID_ERROR_CODE);
    }
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
    if (!this.correctChainId) {
      throw new WebIntegrationErrorByCode(CHAIN_ID_ERROR_CODE);
    }
    try {
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
