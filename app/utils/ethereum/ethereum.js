import { Contract, ethers } from 'ethers';

import { GET_COMMUNITY, GET_USER_BY_ADDRESS } from 'app/utils/ethConstants';

import { getFileUrl, getIpfsHashFromBytes32, getText } from 'app/utils/ipfs';
import { deleteCookie } from 'app/utils/cookie';

import { sendDispatcherTransactionMethod } from 'utils/ethereum/dispatcher';
import { sendMetaTransactionMethod } from 'utils/ethereum/metaTransactions';
import { sendTransactionMethod } from 'utils/ethereum/transactions';

import PeeranhaCommunity from '../../../../peeranha-subgraph/abis/PeeranhaCommunity.json';
import PeeranhaContent from '../../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaToken from '../../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaUser from '../../../../peeranha-subgraph/abis/PeeranhaUser.json';

class EthereumService {
  constructor(data) {
    this.contractUser = null;
    this.contractToken = null;
    this.contractContent = null;
    this.contractCommunity = null;

    this.contractUserReads = null;
    this.contractTokenReads = null;
    this.contractContentReads = null;
    this.contractCommunityReads = null;
    this.edgewareContractUser = null;
    this.connect = data.connect;
    this.setChain = data.setChain;
    this.disconnect = data.disconnect;
    this.connectedChain = data.connectedChain;

    this.wallet = null;
    this.provider = null;
    this.stopWaiting = null;
    this.providerReads = null;
    this.edgewareProvider = null;
    this.selectedAccount = null;
    this.connectedWallets = null;
    this.addToast = data.addToast;
    this.getRecaptchaToken = data.getRecaptchaToken;
    this.showModalDispatch = data.showModalDispatch;
    this.waitForConfirm = data.waitForConfirmDispatch;
    this.transactionFailed = data.transactionFailedDispatch;
    this.transactionInPending = data.transactionInPendingDispatch;
    this.transactionCompleted = data.transactionCompletedDispatch;

    this.sendTransaction = sendTransactionMethod;
    this.sendMetaTransaction = sendMetaTransactionMethod;
    this.sendDispatcherTransaction = sendDispatcherTransactionMethod;
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
    this.provider = ethers.providers.getDefaultProvider(process.env.ETHEREUM_NETWORK);
    this.edgewareProvider = ethers.providers.getDefaultProvider(process.env.EDGEWARE_NETWORK);
    this.providerReads = ethers.providers.getDefaultProvider(process.env.ETHEREUM_NETWORK);

    this.c1ontractUser = new Contract(process.env.USER_ADDRESS, PeeranhaUser, this.provider);

    this.contractUser = new Contract(
      process.env.EDGEWARE_USERLIB_ADDRESS,
      PeeranhaUser,
      this.edgewareProvider,
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
    this.contractToken = new Contract(process.env.PEERANHA_TOKEN, PeeranhaToken, this.provider);

    this.contractUserReads = new Contract(
      process.env.USER_ADDRESS,
      PeeranhaUser,
      this.providerReads,
    );
    this.contractCommunityReads = new Contract(
      process.env.COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      this.providerReads,
    );
    this.contractContentReads = new Contract(
      process.env.CONTENT_ADDRESS,
      PeeranhaContent,
      this.providerReads,
    );
    this.contractTokenReads = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken,
      this.providerReads,
    );
  };

  chainCheck = async (chainId) => {
    chainId = process.env.EDGEWARE_CHAIN_ID;
    if (this.connectedChain.id !== `0x${Number(chainId).toString(16)}`) {
      await this.setChain({
        chainId: `0x${Number(chainId).toString(16)}`,
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

    await this.chainCheck(process.env.chainId);

    this.provider = new ethers.providers.Web3Provider(this.wallet.provider);
    const signer = await this.provider.getSigner();
    this.contractUser = new Contract(process.env.USER_ADDRESS, PeeranhaUser, signer);
    this.contractCommunity = new Contract(process.env.COMMUNITY_ADDRESS, PeeranhaCommunity, signer);
    this.contractContent = new Contract(process.env.CONTENT_ADDRESS, PeeranhaContent, signer);
    this.contractToken = new Contract(process.env.PEERANHA_TOKEN, PeeranhaToken, this.provider);

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
    const user = await this.getUserDataWithArgs(GET_USER_BY_ADDRESS, [userAddress]);

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

  getUserDataWithArgs = async (action, args) => this.contractUserReads[action](...args);

  getCommunityDataWithArgs = async (action, args) => this.contractCommunityReads[action](...args);

  getContentDataWithArgs = async (action, args) => this.contractContentReads[action](...args);

  getTokenDataWithArgs = async (action, args) => this.contractTokenReads[action](...args);

  getCommunityFromContract = async (id) => {
    const rawCommunity = await this.getCommunityDataWithArgs(GET_COMMUNITY, [id]);
    const communityInfo = JSON.parse(
      await getText(getIpfsHashFromBytes32(rawCommunity.ipfsDoc.hash)),
    );
    return {
      id: +id,
      name: communityInfo.name,
      avatar: communityInfo.avatar.imgUrl || getFileUrl(communityInfo.avatar),
      description: communityInfo.description,
      website: communityInfo.website,
      communitySite: communityInfo?.communitySite,
      language: communityInfo.language,
      creationTime: rawCommunity.timeCreate,
      isFrozen: rawCommunity.isFrozen,
      value: +id,
    };
  };
}

export default EthereumService;
