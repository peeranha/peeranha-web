import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateCommunityDomain = state =>
  state.get('createCommunity', initialState);

const selectCreateCommunityLoading = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityLoading'),
  );

const selectCreateCommunityError = () =>
  createSelector(selectCreateCommunityDomain, substate =>
    substate.get('createCommunityError'),
  );

export {
  selectCreateCommunityDomain,
  selectCreateCommunityLoading,
  selectCreateCommunityError,
};
