import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendTokens state domain
 */

const selectSendTokensDomain = state =>
  state.get('sendTokens', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectSendTokensDomain, substate => substate.showModal);

const selectSendTokensProcessing = () =>
  createSelector(
    selectSendTokensDomain,
    substate => substate.sendTokensProcessing,
  );

const selectSendTokensError = () =>
  createSelector(selectSendTokensDomain, substate => substate.sendTokensError);

const selectedAccountSelector = () =>
  createSelector(selectSendTokensDomain, substate => substate.selectedAccount);

const selectedAccountProcessingSelector = () =>
  createSelector(
    selectSendTokensDomain,
    substate => substate.selectAccountProcessing,
  );

export {
  selectSendTokensDomain,
  selectShowModal,
  selectSendTokensProcessing,
  selectSendTokensError,
  selectedAccountSelector,
  selectedAccountProcessingSelector,
};
