import { fromJS } from 'immutable';

import {
  SAVE_CRYPTO_ACCOUNTS,
  SAVE_CRYPTO_ACCOUNTS_ERROR,
  SAVE_CRYPTO_ACCOUNTS_SUCCESS,
} from './constants';

export const initialState = fromJS({});

const cryptoAccountsReducer = (state = initialState, action) => {
  const { type, getUsersError, users, sorting, loadMore, searchText } = action;

  switch (type) {
    case SAVE_CRYPTO_ACCOUNTS:
      debugger
      return state;

    case SAVE_CRYPTO_ACCOUNTS_ERROR:
      return state;

    case SAVE_CRYPTO_ACCOUNTS_SUCCESS:
      return state;

    default:
      return state;
  }
}

export default cryptoAccountsReducer;
