import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginDomain = state => state.get('login', initialState);

const makeSelectContent = () =>
  createSelector(selectLoginDomain, substate => substate.get('content'));

const makeSelectShowModal = () =>
  createSelector(selectLoginDomain, substate => substate.get('showModal'));

const makeSelectEmail = () =>
  createSelector(selectLoginDomain, substate => substate.get('email'));

const selectLoginWithEmailProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithEmailProcessing'),
  );

const makeSelectLoginWithEmailError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithEmailError'),
  );

const makeSelectEosAccount = () =>
  createSelector(selectLoginDomain, substate => substate.get('eosAccount'));

const selectFinishRegistrationProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationProcessing'),
  );

const selectFinishRegistrationError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationWithDisplayNameError'),
  );

const selectLoginWithWalletProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithWalletProcessing'),
  );

const selectLoginWithWalletError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithWalletError'),
  );

export {
  selectLoginDomain,
  makeSelectContent,
  makeSelectShowModal,
  makeSelectEmail,
  selectLoginWithEmailProcessing,
  makeSelectLoginWithEmailError,
  makeSelectEosAccount,
  selectLoginWithWalletError,
  selectFinishRegistrationProcessing,
  selectFinishRegistrationError,
  selectLoginWithWalletProcessing,
};
