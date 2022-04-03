import { Contract, ethers } from 'ethers';
import Peeranha from '../../../peeranha/artifacts/contracts/Peeranha.sol/Peeranha.json';
import PeeranhaToken from '../../../peeranha/artifacts/contracts/PeeranhaToken.sol/PeeranhaToken.json';
import detectEthereumProvider from '@metamask/detect-provider';
import { WebIntegrationErrorByCode } from './errors';
import {
  ETHEREUM_USER_ERROR_CODE,
  INVALID_ETHEREUM_PARAMETERS_ERROR_CODE,
  METAMASK_ERROR_CODE,
  REJECTED_SIGNATURE_REQUEST,
  USER_NOT_SELECTED_ERROR_CODE,
} from './constants';
import { getCookie } from './cookie';
import { AUTOLOGIN_DATA } from '../containers/Login/constants';
import * as bs58 from 'bs58';
import {
  CLAIM_REWARD,
  GET_COMMUNITY,
  GET_TAGS,
  GET_USER_BALANCE,
  GET_USER_BY_ADDRESS,
  GET_USER_PERMISSIONS,
  GET_USER_RATING,
} from './ethConstants';
import { getFileUrl, getText } from './ipfs';

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
  }

  handleAccountsChanged = accounts => {
    if (accounts.length === 0) {
      throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
    } else {
      if (this.selectedAccount !== accounts[0]) {
        this.selectedAccount = accounts[0];
      }
    }
  };

  initEthereum = async () => {
    //TODO for maatic:
    //ETHEREUM_NETWORK='https://rpc-mumbai.maticvigil.com'
    let provider = await detectEthereumProvider();
    if (provider) {
      this.metaMaskProviderDetected = true;
      this.initialized = true;
      this.provider = provider;
      this.contract = new Contract(
        process.env.ETHEREUM_ADDRESS,
        Peeranha.abi,
        new ethers.providers.Web3Provider(provider),
      );
      this.contractToken = new Contract(
        process.env.PEERANHA_TOKEN,
        PeeranhaToken.abi,
        new ethers.providers.Web3Provider(provider),
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
  };

  metaMaskSignIn = async () => {
    if (!this.metaMaskProviderDetected) {
      throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
    }
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
    if (this.wasReseted || !autoLoginData) {
      await this.provider
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
    }
    await this.provider
      .request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountsChanged)
      .catch(() => {
        throw new WebIntegrationErrorByCode(ETHEREUM_USER_ERROR_CODE);
      });
    this.withMetaMask = true;
    this.contract = new Contract(
      process.env.ETHEREUM_ADDRESS,
      Peeranha.abi,
      new ethers.providers.Web3Provider(this.provider).getSigner(),
    );
    return this.selectedAccount;
  };

  setMetaMaskAutologinData = async metaMaskAutologinData => {
    this.selectedAccount = metaMaskAutologinData;
    this.withMetaMask = true;
  };

  resetMetaMaskUserData = async () => {
    this.wasReseted = true;
    this.metaMaskUserAddress = null;
    this.withMetaMask = false;
    this.selectedAccount = null;
  };

  getSelectedAccount = async () =>
    this.selectedAccount ||
    JSON.parse(getCookie(AUTOLOGIN_DATA) || null) ||
    null;

  getBytes32FromIpfsHash = ipfsListing => {
    return (
      '0x' +
      bs58
        .decode(ipfsListing)
        .slice(2)
        .toString('hex')
    );
  };

  getIpfsHashFromBytes32 = bytes32Hex => {
    const hashHex = '1220' + bytes32Hex.slice(2);
    const hashBytes = Buffer.from(hashHex, 'hex');
    return bs58.encode(hashBytes);
  };

  getProfile = async userAddress => {
    const user = await this.contract[GET_USER_BY_ADDRESS](userAddress);
    const permissions = await this.contract[GET_USER_PERMISSIONS](userAddress);
    return {
      creationTime: user.creationTime,
      ipfsDoc: user.ipfsDoc,
      rating: user.rating,
      permissions,
      followedCommunities: user.followedCommunities,
      ipfsHash: this.getIpfsHashFromBytes32(user.ipfsDoc.hash),
    };
  };

  sendTransactionWithSigner = async (actor, action, data) => {
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
  };

  sendTransactionWithoutDelegating = async (actor, action, data) => {
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
  };

  sendTransaction = async (actor, action, data) => {
    try {
      const transactionData = this.getBytes32FromIpfsHash(data);
      const transaction = await this.contract[action](transactionData);
      await transaction.wait();
    } catch (err) {
      if (err.code === INVALID_ETHEREUM_PARAMETERS_ERROR_CODE) {
        throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
      } else throw err;
    }
  };

  getData = async action => {
    return await this.contract[action]();
  };

  getDataWithArgs = async (action, args) => {
    return await this.contract[action](...args);
  };

  getTagsFromContract = async communityId => {
    const rawTags = await this.contract[GET_TAGS](communityId);
    return await Promise.all(
      rawTags.map(async rawTag => {
        const tag = JSON.parse(
          await getText(this.getIpfsHashFromBytes32(rawTag.ipfsDoc.hash)),
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
    const rawCommunity = await this.contract[GET_COMMUNITY](id);
    const communityInfo = JSON.parse(
      await getText(this.getIpfsHashFromBytes32(rawCommunity.ipfsDoc.hash)),
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
    let communities = [];
    for (let i = 1; i <= count; i++) {
      communities.push(await this.getCommunityFromContract(i));
    }
    return communities;
  };

  getUserRating = async (user, communityId) =>
    await this.contract[GET_USER_RATING](user, communityId);

  getUserBalance = async user =>
    await this.contractToken[GET_USER_BALANCE](user);

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
