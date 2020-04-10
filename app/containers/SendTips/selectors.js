import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendTips state domain
 */

const selectSendTipsDomain = state =>
  state.get('sendTips', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectSendTipsDomain, substate => substate.showModal);

const selectSendTipsProcessing = () =>
  createSelector(selectSendTipsDomain, substate => substate.sendTipsProcessing);

const selectSendTipsError = () =>
  createSelector(selectSendTipsDomain, substate => substate.sendTipsError);

const selectedAccountSelector = () =>
  createSelector(selectSendTipsDomain, substate => substate.selectedAccount);

const selectedAccountProcessingSelector = () =>
  createSelector(
    selectSendTipsDomain,
    substate => substate.selectAccountProcessing,
  );

const selectTipsEosService = () =>
  createSelector(selectSendTipsDomain, substate => substate.tipsEosService);

export {
  selectSendTipsDomain,
  selectShowModal,
  selectSendTipsProcessing,
  selectSendTipsError,
  selectedAccountSelector,
  selectedAccountProcessingSelector,
  selectTipsEosService,
};
