import { fromJS } from 'immutable';

import {
  SAVE_CRYPTO_ACCOUNTS,
  SAVE_CRYPTO_ACCOUNTS_ERROR,
  SAVE_CRYPTO_ACCOUNTS_SUCCESS,
} from './constants';

export const initialState = fromJS({
  cryptoAccounts: {},
});

const cryptoAccountsReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SAVE_CRYPTO_ACCOUNTS:
      return state.set('isSaveCryptoAccountsProcessing', true);

    case SAVE_CRYPTO_ACCOUNTS_SUCCESS:
      return state.set('isSaveCryptoAccountsProcessing', false);

    case SAVE_CRYPTO_ACCOUNTS_ERROR:
      return state.set('isSaveCryptoAccountsProcessing', false);

    default:
      return state;
  }
};

export default cryptoAccountsReducer;
