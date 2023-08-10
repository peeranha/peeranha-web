import { SET_WALLET, SET_TRANSACTION_LIST } from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export function setWallet(wallet: WalletContextState) {
  return {
    type: SET_WALLET,
    wallet,
  };
}
export function setTransactionList(transactionList: [any]) {
  return {
    type: SET_TRANSACTION_LIST,
    transactionList,
  };
}
