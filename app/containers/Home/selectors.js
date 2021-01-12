import { createSelector } from 'reselect';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { initialState } from './reducer';
import { HOME_KEY } from './constants';

export const selectHomeDomain = state =>
  state.get(HOME_KEY, initialState);

export const selectQuestions = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().questions,
  );
