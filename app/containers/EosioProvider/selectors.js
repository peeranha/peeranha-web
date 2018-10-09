import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eosioProvider state domain
 */

const selectEosioProviderDomain = state =>
  state.get('eosioProvider', initialState);

const makeSelectInitializing = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('initializing'),
  );

const makeSelectEos = () =>
  createSelector(selectEosioProviderDomain, substate => substate.get('eos'));

const makeSelectError = () =>
  createSelector(selectEosioProviderDomain, substate => substate.get('error'));

export {
  selectEosioProviderDomain,
  makeSelectInitializing,
  makeSelectEos,
  makeSelectError,
};
