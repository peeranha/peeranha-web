import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { HOME_KEY } from './constants';

export const selectHomeDomain = state =>
  state.get(HOME_KEY, initialState);

export const selectQuestions = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().questions,
  );

export const selectQuestionsLoading = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().questionsLoading,
  );

export const selectCommunity = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().community,
  );

export const selectCommunityLoading = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().communityLoading,
  );

export const selectLogo = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().logo,
  );

export const selectLogoLoading = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().logoLoading,
  );
