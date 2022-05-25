import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ethereumProvider state domain
 */

const selectEthereumProviderDomain = state =>
  state.get('ethereumProvider', initialState);

const selectEthereum = state =>
  selectEthereumProviderDomain(state).get('ethereum');

const makeSelectInitializing = () =>
  createSelector(selectEthereumProviderDomain, substate =>
    substate.get('initializing'),
  );

const makeSelectEthereum = () =>
  createSelector(selectEthereumProviderDomain, substate =>
    substate.get('ethereum'),
  );

const makeSelectError = () =>
  createSelector(selectEthereumProviderDomain, substate =>
    substate.get('error'),
  );

export const makeSelectShowModal = () =>
  createSelector(selectEthereumProviderDomain, substate =>
    substate.get('showModal'),
  );

export {
  selectEthereumProviderDomain,
  selectEthereum,
  makeSelectInitializing,
  makeSelectEthereum,
  makeSelectError,
};
