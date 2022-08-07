import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectLoginDomain = state => state.get('login', initialState);

export const makeSelectContent = () =>
  createSelector(selectLoginDomain, substate => substate.get('content'));

export const makeSelectShowModal = () =>
  createSelector(selectLoginDomain, substate => substate.get('showModal'));

export const makeSelectEthereumAccount = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('ethereumAccount'),
  );

export const selectLoginWithWalletProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithWalletProcessing'),
  );

export const selectIsNewPostCreationAfterLogin = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('isNewPostCreationAfterLogin'),
  );
