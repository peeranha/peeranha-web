import {
  SET_WALLET,
  SET_TRANSACTION_LIST,
  SET_EMAIL_LOGIN_DATA,
  CLEAR_EMAIL_LOGIN_DATA,
} from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export function setWallet(wallet: WalletContextState) {
  return {
    type: SET_WALLET,
    wallet,
  };
}

export function setEmailLoginData(emailLoginData: {
  address: string;
  token: string;
  email: string;
}) {
  return {
    type: SET_EMAIL_LOGIN_DATA,
    emailLoginData,
  };
}

export function clearEmailLoginData() {
  return {
    type: CLEAR_EMAIL_LOGIN_DATA,
  };
}

export function setTransactionList(transactionList: [any]) {
  return {
    type: SET_TRANSACTION_LIST,
    transactionList,
  };
}
