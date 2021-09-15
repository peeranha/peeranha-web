import { Contract, ethers } from 'ethers';
import Peeranha from '../../../peeranha-solidity/artifacts/contracts/Peeranha.sol/Peeranha.json';
import detectEthereumProvider from '@metamask/detect-provider';
import { WebIntegrationErrorByCode } from './errors';
import { ETHEREUM_USER_ERROR_CODE, METAMASK_ERROR_CODE } from './constants';
import { getCookie } from './cookie';
import { AUTOLOGIN_DATA } from '../containers/Login/constants';
import * as bs58 from 'bs58';
import { GET_USER_BY_ADDRESS } from './ethConstants';

class EthereumService {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.initialized = false;
    this.metaMaskUserAddress = null;
    this.withMetaMask = false;
    this.selectedAccount = null;
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
    let provider = await detectEthereumProvider();
    if (provider) {
      this.initialized = true;
      this.provider = provider;
      this.contract = new Contract(
        process.env.ETHEREUM_ADDRESS,
        Peeranha.abi,
        new ethers.providers.Web3Provider(provider),
      );
    }
  };

  metaMaskSignIn = async () => {
    if (!this.provider) {
      throw new WebIntegrationErrorByCode(METAMASK_ERROR_CODE);
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
    return {
      ...user,
      ipfsHash: this.getIpfsHashFromBytes32(user.ipfsDoc.hash),
    };
  };

  sendTransaction = async (actor, action, data) => {
    const transactionData = this.getBytes32FromIpfsHash(data);
    const transaction = await this.contract[action](transactionData);
    await transaction.wait();
  };

  getData = async (action, data) => {
    return await this.contract[action]();
  };
}

export default EthereumService;
