import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the followCommunityButton state domain
 */

const selectFollowCommunityButtonDomain = state =>
  state.get('followCommunityButton', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FollowCommunityButton
 */

const makeSelectFollowCommunityButton = () =>
  createSelector(selectFollowCommunityButtonDomain, substate =>
    substate.toJS(),
  );

export default makeSelectFollowCommunityButton;
export { selectFollowCommunityButtonDomain };
