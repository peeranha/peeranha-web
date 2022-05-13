import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendTips state domain
 */

const selectSendTipsDomain = (state) =>
  state.get('sendTips', initialState).toJS();

const selectShowModal = () =>
  createSelector(selectSendTipsDomain, (substate) => substate.showModal);

const selectSendTipsProcessing = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.sendTipsProcessing,
  );

const selectSendTipsError = () =>
  createSelector(selectSendTipsDomain, (substate) => substate.sendTipsError);

const selectedScatterAccountSelector = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.selectedScatterAccount,
  );

const selectedKeycatAccountSelector = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.selectedKeycatAccount,
  );

const selectedAccountProcessingSelector = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.selectAccountProcessing,
  );

const selectTipsScatterEosService = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.tipsScatterEosService,
  );

const selectTipsKeycatEosService = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.tipsKeycatEosService,
  );

const selectWhoWillBeTipped = () =>
  createSelector(selectSendTipsDomain, (substate) => substate.whoWillBeTipped);

const selectIsVerifyFbModal = () =>
  createSelector(selectSendTipsDomain, (substate) => substate.isVerifyFbModal);

const selectFbSendTipsFormValues = () =>
  createSelector(
    selectSendTipsDomain,
    (substate) => substate.fbSendTipsFormValues,
  );

export {
  selectSendTipsDomain,
  selectShowModal,
  selectSendTipsProcessing,
  selectSendTipsError,
  selectedScatterAccountSelector,
  selectedKeycatAccountSelector,
  selectedAccountProcessingSelector,
  selectTipsScatterEosService,
  selectTipsKeycatEosService,
  selectWhoWillBeTipped,
  selectIsVerifyFbModal,
  selectFbSendTipsFormValues,
};
