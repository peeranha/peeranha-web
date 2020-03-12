import {
  SAVE_CRYPTO_ACCOUNTS,
  SAVE_CRYPTO_ACCOUNTS_ERROR,
  SAVE_CRYPTO_ACCOUNTS_SUCCESS,
} from './constants';

export const saveCryptoAccounts = (cryptoAccounts, profile) => {
  debugger
  return ({
    type: SAVE_CRYPTO_ACCOUNTS,
    cryptoAccounts,
    profile,
  });
}

export const saveCryptoAccountsSuccess = () => ({
  type: SAVE_CRYPTO_ACCOUNTS_SUCCESS,
});

export const saveCryptoAccountsErr = () => ({
  type: SAVE_CRYPTO_ACCOUNTS_ERROR,
});
