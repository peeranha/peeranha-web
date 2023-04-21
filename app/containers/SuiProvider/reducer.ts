import { fromJS } from 'immutable';
import { SET_WALLET } from 'containers/SuiProvider/constants';

export const initialState = fromJS({
  wallet: null,
});

function suiProviderReducer(state = initialState, action: { type: string; wallet: any }) {
  const { type, wallet } = action;
  switch (type) {
    case SET_WALLET:
      return state.set('wallet', wallet);
    default:
      return state;
  }
}

export default suiProviderReducer;
