import { fromJS } from 'immutable';
import { SET_WALLET } from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export const initialState = fromJS({
  wallet: null,
});

function suiProviderReducer(
  state = initialState,
  action: { type: string; wallet: WalletContextState },
) {
  const { type, wallet } = action;
  switch (type) {
    case SET_WALLET:
      return state.set('wallet', wallet);
    default:
      return state;
  }
}

export default suiProviderReducer;
