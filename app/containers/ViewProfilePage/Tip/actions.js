import {
  SAVE_CRYPTO_ACCOUNTS,
  SAVE_CRYPTO_ACCOUNTS_ERROR,
  SAVE_CRYPTO_ACCOUNTS_SUCCESS,
} from './constants';

export const saveCryptoAccounts = ({ cryptoAccounts, profile, resetForm }) => ({
  type: SAVE_CRYPTO_ACCOUNTS,
  cryptoAccounts,
  profile,
  resetForm,
});

export const saveCryptoAccountsSuccess = () => ({
  type: SAVE_CRYPTO_ACCOUNTS_SUCCESS,
});

export const saveCryptoAccountsErr = saveCryptoAccountsError => ({
  type: SAVE_CRYPTO_ACCOUNTS_ERROR,
  saveCryptoAccountsError,
});
