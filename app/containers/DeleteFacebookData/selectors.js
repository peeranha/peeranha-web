import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectdeleteFacebookDataDomain = state =>
  state.get('deleteFacebookData', initialState);

export const selectFacebookUserId = () =>
  createSelector(selectdeleteFacebookDataDomain, substate =>
    substate.get('facebookUserId'),
  );

export const selectStage = () =>
  createSelector(selectdeleteFacebookDataDomain, substate =>
    substate.get('stage'),
  );

export const selectFbUserEmail = () =>
  createSelector(selectdeleteFacebookDataDomain, substate =>
    substate.get('facebookUserEmail'),
  );

export const makeSelectFacebookUserId = () =>
  createSelector(selectdeleteFacebookDataDomain, substate =>
    substate.get('facebookUserId'),
  );

export const selectDelFbDataProcessing = () =>
  createSelector(selectdeleteFacebookDataDomain, substate =>
    substate.get('processing'),
  );

export default {
  selectFacebookUserId,
  selectStage,
  selectDelFbDataProcessing,
};
