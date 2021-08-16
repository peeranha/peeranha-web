import { Contract, ethers } from 'ethers';
import Peeranha from './Peeranha.json';
import detectEthereumProvider from '@metamask/detect-provider';
import { WebIntegrationErrorByCode } from './errors';
import { ETHEREUM_USER_ERROR_CODE, METAMASK_ERROR_CODE } from './constants';
import { getCookie } from './cookie';
import { AUTOLOGIN_DATA } from '../containers/Login/constants';
import * as bs58 from 'bs58';
import { GET_USER_BY_ADDRESS } from './ethConstants';
//
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// export const contract = new ethers.Contract(process.env.ETHEREUM_ADDRESS, Peeranha.abi, provider);

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
      ipfsHash: this.getIpfsHashFromBytes32(user.ipfsHash),
    };
  };

  sendTransaction = async (actor, action, data, account) => {
    const transactionData = this.getBytes32FromIpfsHash(data);
    this.contract[action](transactionData);
  };
}

export default EthereumService;
