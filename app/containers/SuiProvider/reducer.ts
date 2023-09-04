import { fromJS } from 'immutable';
import { SET_TRANSACTION_LIST, SET_WALLET } from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export const initialState = fromJS({
  wallet: null,
  transactionList: [],
});

function suiProviderReducer(
  state = initialState,
  action: { type: string; wallet: WalletContextState; transactionList: [any] },
) {
  const { type, wallet, transactionList } = action;
  switch (type) {
    case SET_WALLET:
      return state.set('wallet', wallet);
    case SET_TRANSACTION_LIST:
      return state.set('transactionList', [...transactionList]);
    default:
      return state;
  }
}

export default suiProviderReducer;
