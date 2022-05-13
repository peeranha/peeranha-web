import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectLoginDomain = state => state.get('login', initialState);

export const makeSelectContent = () =>
  createSelector(selectLoginDomain, substate => substate.get('content'));

export const makeSelectShowModal = () =>
  createSelector(selectLoginDomain, substate => substate.get('showModal'));

export const makeSelectEmail = () =>
  createSelector(selectLoginDomain, substate => substate.get('email'));

export const selectLoginWithEmailProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithEmailProcessing'),
  );

export const makeSelectLoginWithEmailError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithEmailError'),
  );

export const makeSelectEosAccount = () =>
  createSelector(selectLoginDomain, substate => substate.get('eosAccount'));

export const selectFinishRegistrationProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationProcessing'),
  );

export const selectFinishRegistrationError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationWithDisplayNameError'),
  );

export const selectLoginWithWalletProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithWalletProcessing'),
  );

export const selectLoginWithWalletError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithWalletError'),
  );

export const selectFacebookLoginProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('facebookLoginProcessing'),
  );

export const selectIsNewPostCreationAfterLogin = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('isNewPostCreationAfterLogin'),
  );
