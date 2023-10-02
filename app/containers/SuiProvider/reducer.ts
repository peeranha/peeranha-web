import { fromJS } from 'immutable';
import {
  CLEAR_EMAIL_LOGIN_DATA,
  SET_EMAIL_LOGIN_DATA,
  SET_TRANSACTION_LIST,
  SET_WALLET,
} from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export const initialState = fromJS({
  wallet: null,
  transactionList: [],
  emailLoginData: null,
});

function suiProviderReducer(
  state = initialState,
  action: {
    type: string;
    wallet: WalletContextState;
    transactionList: [any];
    emailLoginData: { address: string; token: string };
  },
) {
  const { type, wallet, transactionList, emailLoginData } = action;
  switch (type) {
    case SET_WALLET:
      return state.set('wallet', wallet);
    case SET_TRANSACTION_LIST:
      return state.set('transactionList', [...transactionList]);
    case SET_EMAIL_LOGIN_DATA:
      return state.set('emailLoginData', emailLoginData);
    case CLEAR_EMAIL_LOGIN_DATA:
      return state.set('emailLoginData', null);
    default:
      return state;
  }
}

export default suiProviderReducer;
