import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModerationDomain = (state: {
  get: (arg0: string, arg1: any) => any;
}) => state.get('moderationReducer', initialState);

const selectModeratorsLoading = createSelector(
  selectModerationDomain,
  (substate) => substate.get('moderatorsLoading'),
);

const selectModeratorsList = createSelector(
  selectModerationDomain,
  (substate) => substate.get('moderatorsList'),
);

const selectAddModeratorLoading = createSelector(
  selectModerationDomain,
  (substate) => substate.get('addModeratorLoading'),
);

const selectRevokeModeratorLoading = createSelector(
  selectModerationDomain,
  (substate) => substate.get('revokeModeratorLoading'),
);

export {
  selectModeratorsLoading,
  selectModeratorsList,
  selectAddModeratorLoading,
  selectRevokeModeratorLoading,
};
