import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectTelegramAcoountActionDomain = (state) =>
  state.get('telegramAccountAction', initialState).toJS();

const selectGetUserTgData = () =>
  createSelector(
    selectTelegramAcoountActionDomain,
    (substate) => substate.userTgData,
  );

const selectGetConfirmTelegramAccountProcessing = () =>
  createSelector(
    selectTelegramAcoountActionDomain,
    (substate) => substate.confirmTelegramAccountProcessing,
  );

const selectGetUnlinkTelegramAccountProcessing = () =>
  createSelector(
    selectTelegramAcoountActionDomain,
    (substate) => substate.unlinkTelegramAccountProcessing,
  );

export {
  selectGetUserTgData,
  selectGetConfirmTelegramAccountProcessing,
  selectGetUnlinkTelegramAccountProcessing,
};
