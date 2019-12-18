import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eosioProvider state domain
 */

const selectEosioProviderDomain = state =>
  state.get('eosioProvider', initialState);

const selectEos = state => selectEosioProviderDomain(state).get('eos');

const makeSelectInitializing = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('initializing'),
  );

const makeSelectEos = () =>
  createSelector(selectEosioProviderDomain, substate => substate.get('eos'));

const makeSelectError = () =>
  createSelector(selectEosioProviderDomain, substate => substate.get('error'));

const selectScatter = () =>
  createSelector(selectEosioProviderDomain, substate =>
    substate.get('scatter'),
  );

export {
  selectEosioProviderDomain,
  selectEos,
  makeSelectInitializing,
  makeSelectEos,
  makeSelectError,
  selectScatter,
};
