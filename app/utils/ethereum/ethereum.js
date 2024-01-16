import Torus from '@toruslabs/torus-embed';
import { deleteCookie, getCookie, setCookie } from 'app/utils/cookie';
import { MATIC, POLYGON, POLYGON_TESTNET, PROD_ENV } from 'containers/EthereumProvider/constants';
import { BigNumber, Contract, ethers } from 'ethers';
import { CONNECTED_WALLET } from 'utils/constants';

import { sendDispatcherTransactionMethod } from 'utils/ethereum/dispatcher';
import { sendMetaTransactionMethod } from 'utils/ethereum/metaTransactions';
import { sendTransactionMethod } from 'utils/ethereum/transactions';
import { TRANSACTION_LIST, writeTransactionList } from 'utils/transactionsListManagement';

import PeeranhaCommunity from '../../../../peeranha-subgraph/abis/PeeranhaCommunity.json';
import PeeranhaContent from '../../../../peeranha-subgraph/abis/PeeranhaContent.json';
import PeeranhaToken from '../../../../peeranha-subgraph/abis/PeeranhaToken.json';
import PeeranhaUser from '../../../../peeranha-subgraph/abis/PeeranhaUser.json';

export const NETWORK_ID = 'networkid';
const networkLabel = process.env.ENV === PROD_ENV ? POLYGON : POLYGON_TESTNET;

class EthereumService {
  constructor(data) {
    this.CHAIN_IDS = [process.env.CHAIN_ID, process.env.EDGEWARE_CHAIN_ID];
    this.contractUser = null;
    this.contractToken = null;
    this.contractContent = null;
    this.contractCommunity = null;

    this.contractTokenReads = null;
    this.contractUserReads = null;
    this.contractContentReads = null;
    this.contractCommunityReads = null;

    this.edgewareCntractTokenReads = null;
    this.edgewareContractUserReads = null;
    this.edgewareContractContentReads = null;
    this.edgewareContractCommunityReads = null;

    this.edgewareContractCommunity = null;
    this.edgewareContractContent = null;
    this.edgewareContractToken = null;
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
    this.setTransactionList = data.setTransactionListDispatch;
    this.transactionInPending = data.transactionInPendingDispatch;
    this.transactionCompleted = data.transactionCompletedDispatch;
    this.providerForWaiting = ['providerReads', 'edgewareProviderReads'];

    this.previousNonce = BigNumber.from(-1);
    this.transactionList = [];

    this.sendTransaction = sendTransactionMethod;
    this.sendMetaTransaction = sendMetaTransactionMethod;
    this.sendDispatcherTransaction = sendDispatcherTransactionMethod;
    this.chains = [
      {
        id: `0x${Number(process.env.CHAIN_ID).toString(16)}`,
        token: MATIC,
        label: networkLabel,
        // rpcUrl: process.env.ETHEREUM_NETWORK,
      },
      {
        id: `0x${Number(process.env.EDGEWARE_CHAIN_ID).toString(16)}`,
        token: 'EDG',
        label: 'Edgeware',
        rpcUrl: process.env.EDGEWARE_NETWORK,
      },
    ];
  }

  setData = (data) => {
    this.wallet = data.wallet;
    this.connectedWallets = data.connectedWallets;
    this.selectedAccount = this.wallet?.accounts[0].address.toLowerCase();
    this.connectedChain = data.connectedChain;
  };

  initEthereum = async () => {
    this.provider = ethers.providers.getDefaultProvider(process.env.ETHEREUM_NETWORK);
    this.edgewareProvider = ethers.providers.getDefaultProvider(process.env.EDGEWARE_NETWORK);
    this.edgewareProviderReads = ethers.providers.getDefaultProvider(process.env.EDGEWARE_NETWORK);
    this.providerReads = ethers.providers.getDefaultProvider(process.env.ETHEREUM_NETWORK);

    this.contractUser = new Contract(process.env.USER_ADDRESS, PeeranhaUser, this.provider);
    this.edgewareContractUser = new Contract(
      process.env.EDGEWARE_USER_ADDRESS,
      PeeranhaUser,
      this.edgewareProvider,
    );
    this.contractCommunity = new Contract(
      process.env.COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      this.provider,
    );
    this.edgewareContractCommunity = new Contract(
      process.env.EDGEWARE_COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      this.edgewareProvider,
    );
    this.contractContent = new Contract(
      process.env.CONTENT_ADDRESS,
      PeeranhaContent,
      this.provider,
    );
    this.edgewareContractContent = new Contract(
      process.env.EDGEWARE_CONTENT_ADDRESS,
      PeeranhaContent,
      this.edgewareProvider,
    );
    this.contractToken = new Contract(process.env.PEERANHA_TOKEN, PeeranhaToken, this.provider);
    this.edgewareContractToken = new Contract(
      process.env.EDGEWARE_TOKEN_ADDRESS,
      PeeranhaToken,
      this.edgewareProvider,
    );
    this.contractUserReads = new Contract(
      process.env.USER_ADDRESS,
      PeeranhaUser,
      this.providerReads,
    );
    this.edgewareContractUserReads = new Contract(
      process.env.EDGEWARE_USER_ADDRESS,
      PeeranhaUser,
      this.edgewareProviderReads,
    );
    this.contractCommunityReads = new Contract(
      process.env.COMMUNITY_ADDRESS,
      PeeranhaCommunity,
      this.providerReads,
    );
    this.edgewareContractCommunityReads = new Contract(
      process.env.EDGEWARE_COMMUNITY_ADDRESS,
      PeeranhaUser,
      this.edgewareProviderReads,
    );
    this.contractContentReads = new Contract(
      process.env.CONTENT_ADDRESS,
      PeeranhaContent,
      this.providerReads,
    );
    this.edgewareContractContentReads = new Contract(
      process.env.EDGEWARE_CONTENT_ADDRESS,
      PeeranhaContent,
      this.edgewareProviderReads,
    );
    this.contractTokenReads = new Contract(
      process.env.PEERANHA_TOKEN,
      PeeranhaToken,
      this.providerReads,
    );
    this.edgewareContractTokenReads = new Contract(
      process.env.EDGEWARE_TOKEN_ADDRESS,
      PeeranhaContent,
      this.edgewareProviderReads,
    );

    const transactionList = JSON.parse(localStorage.getItem(TRANSACTION_LIST))?.filter(
      (transaction) => !transaction.result,
    );
    if (transactionList && transactionList.length) {
      transactionList.map(async (transaction) => {
        this.transactionList.push({
          ...transaction,
          result: await this[
            this.providerForWaiting[Number(transaction.network)]
          ].waitForTransaction(transaction.transactionHash),
        });

        setTimeout(() => {
          const index = this.transactionList
            .map((transactionFromList) => transactionFromList.transactionHash)
            .indexOf(transaction.transactionHash);
          if (index !== -1) {
            this.transactionList.splice(index, 1);
            this.setTransactionList(this.transactionList);
          }
        }, '30000');

        this.setTransactionList(this.transactionList);
        writeTransactionList(this.transactionList, 5);
      });
    }
    this.setTransactionList(this.transactionList);
    writeTransactionList(this.transactionList, 6);
  };
  chainCheck = async (network) => {
    try {
      if (network === undefined) {
        network = getCookie(NETWORK_ID);
      }
      const chainId = this.CHAIN_IDS[Number(network) || 0];
      const chainIdHex = `0x${Number(chainId).toString(16)}`;
      if (
        this.torus
          ? Number(this.provider.network.chainId) !== Number(chainId)
          : this.connectedChain.id !== chainIdHex
      ) {
        let chainChanged;
        if (this.torus) {
          const chain = this.chains.find(({ id }) => id === chainIdHex);
          await this.torus.setProvider({
            host: chain.rpcUrl,
            chainId: parseInt(chain.id, 10),
            networkName: chain.label,
          });
          chainChanged = true;
        } else {
          chainChanged = await this.setChain({
            chainId: `0x${Number(process.env.CHAIN_ID).toString(16)}`,
          });
        }

        if (chainChanged) {
          setCookie({
            name: NETWORK_ID,
            value: Number(network),
            options: {
              defaultPath: true,
              allowSubdomains: true,
            },
          });
        } else {
          throw new Error('Set chain rejected');
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  walletLogIn = async (previouslyConnectedWallet, isTorus) => {
    try {
      document.getElementsByTagName('body')[0].style.position = 'fixed';
    } catch (err) {}
    let signer;
    if (isTorus) {
      this.torus = new Torus();
      await this.torus.init({
        buildEnv: 'production',
        showTorusButton: false,
        network: {
          buildEnv: 'production',
          chainId: Number(process.env.CHAIN_ID),
          networkName: networkLabel,
        },
      });
      await this.torus.login();
      this.provider = new ethers.providers.Web3Provider(this.torus.provider, 'any');
      signer = await this.provider.getSigner();
      this.selectedAccount = (await signer.getAddress()).toLowerCase();
    } else {
      if (previouslyConnectedWallet) {
        await this.connect({ autoSelect: previouslyConnectedWallet });
      } else {
        await this.connect();
      }

      if (!this.connectedWallets?.length) {
        document.getElementsByTagName('body')[0].style.position = 'relative';
        deleteCookie(CONNECTED_WALLET);
        return;
      }

      this.provider = new ethers.providers.Web3Provider(this.wallet.provider, 'any');
      signer = await this.provider.getSigner();
    }

    this.contractUser = new Contract(process.env.USER_ADDRESS, PeeranhaUser, signer);
    this.contractCommunity = new Contract(process.env.COMMUNITY_ADDRESS, PeeranhaCommunity, signer);
    this.contractContent = new Contract(process.env.CONTENT_ADDRESS, PeeranhaContent, signer);
    this.contractToken = new Contract(process.env.PEERANHA_TOKEN, PeeranhaToken, this.provider);

    document.getElementsByTagName('body')[0].style.position = 'relative';

    return this.selectedAccount.toLowerCase();
  };

  resetWalletState = async () => {
    if (this.torus) {
      await this.torus.logout();
      await this.torus.cleanUp();
      this.torus = null;
    } else {
      await this.disconnect(this.wallet);
    }

    deleteCookie(CONNECTED_WALLET);
    this.selectedAccount = null;
  };

  setSelectedAccount = (account) => {
    this.selectedAccount = account?.toLowerCase();
  };

  getSelectedAccount = () => this.selectedAccount;
  waitForCloseModal() {
    return new Promise((resolve) => {
      this.stopWaiting = function () {
        resolve();
      };
    });
  }
  getContentDataWithArgs = async (action, args) => this.contractContentReads[action](...args);
  getEdgewareContentDataWithArgs = async (action, args) =>
    this.edgewareContractContentReads[action](...args);

  getTokenDataWithArgs = async (action, args) => this.contractTokenReads[action](...args);
}

export default EthereumService;
