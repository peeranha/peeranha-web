import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questions state domain
 */

const selectQuestionsDomain = state =>
  state.get('questionsReducer', initialState);

const selectQuestionsLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsLoading'),
  );

const selectQuestionsList = () =>
  createSelector(
    selectQuestionsDomain,
    substate => substate.toJS().questionsList,
  );

const selectQuestionsError = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsError'),
  );

const selectInitLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('initLoadedItems'),
  );

const selectNextLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('nextLoadedItems'),
  );

const selectIsLastFetch = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('isLastFetch'),
  );

const selectCommunityIdFilter = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('communityIdFilter'),
  );

const selectFollowedCommunities = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followedCommunities'),
  );

const selectFollowHandlerLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followHandlerLoading'),
  );

const selectFollowHandlerError = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followHandlerError'),
  );

export {
  selectQuestionsDomain,
  selectQuestionsLoading,
  selectQuestionsList,
  selectQuestionsError,
  selectInitLoadedItems,
  selectNextLoadedItems,
  selectIsLastFetch,
  selectCommunityIdFilter,
  selectFollowedCommunities,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
};
