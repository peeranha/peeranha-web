import { createSelector } from 'reselect';

import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';

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
  createSelector(selectHomeDomain, substate => {
    let { logo } = substate.toJS();

    const single = isSingleCommunityWebsite();
    const styles = singleCommunityStyles();

    if (!logo && single) {
      logo = styles.signUpPageLogo;
    }

    return logo;
  });

export const selectLogoLoading = () =>
  createSelector(selectHomeDomain, substate =>
    substate.toJS().logoLoading,
  );
