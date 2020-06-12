import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditProfileDomain = state =>
  state.get('editCryptoAccounts', initialState);

export const selectIsSaveCryptoAccountsProcessing = () =>
  createSelector(selectEditProfileDomain, substate =>
    substate.get('isSaveCryptoAccountsProcessing'),
  );
