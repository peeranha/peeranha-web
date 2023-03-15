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

const selectAddRoleLoading = createSelector(
  selectModerationDomain,
  (substate) => substate.get('addRoleLoading'),
);

const selectRevokeRoleLoading = createSelector(
  selectModerationDomain,
  (substate) => substate.get('revokeRoleLoading'),
);

export {
  selectModeratorsLoading,
  selectModeratorsList,
  selectAddRoleLoading,
  selectRevokeRoleLoading,
};
