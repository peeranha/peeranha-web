import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginDomain = state => state.get('login', initialState);

const makeSelectContent = () =>
  createSelector(selectLoginDomain, substate => substate.get('content'));

const makeSelectShowModal = () =>
  createSelector(selectLoginDomain, substate => substate.get('showModal'));

const makeSelectEmail = () =>
  createSelector(selectLoginDomain, substate => substate.get('email'));

const makeSelectLoginProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginProcessing'),
  );

const makeSelectLoginWithEmailError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithEmailError'),
  );

const makeSelectEosAccount = () =>
  createSelector(selectLoginDomain, substate => substate.get('eosAccount'));

const selectLoginWithScatterError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('loginWithScatterError'),
  );

const selectFinishRegistrationProcessing = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationProcessing'),
  );

const selectFinishRegistrationError = () =>
  createSelector(selectLoginDomain, substate =>
    substate.get('finishRegistrationWithDisplayNameError'),
  );

export {
  selectLoginDomain,
  makeSelectContent,
  makeSelectShowModal,
  makeSelectEmail,
  makeSelectLoginProcessing,
  makeSelectLoginWithEmailError,
  makeSelectEosAccount,
  selectLoginWithScatterError,
  selectFinishRegistrationProcessing,
  selectFinishRegistrationError,
};
