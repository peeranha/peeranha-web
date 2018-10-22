import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountInitializerDomain = state =>
  state.get('accountInitializer', initialState);

const makeSelectAccount = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('account'),
  );

const makeSelectLoading = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('error'),
  );

const makeSelectEosInit = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('eosInit'),
  );

const makeSelectAccountError = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('selectAccountError'),
  );

const makeSelectForgetIdentityError = () =>
  createSelector(selectAccountInitializerDomain, substate =>
    substate.get('forgetIdentityError'),
  );

export {
  selectAccountInitializerDomain,
  makeSelectAccount,
  makeSelectLoading,
  makeSelectError,
  makeSelectEosInit,
  makeSelectAccountError,
  makeSelectForgetIdentityError,
};
