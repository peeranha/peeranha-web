import { createSelector } from 'reselect';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

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

const selectTopQuestions = () =>
  createSelector(selectQuestionsDomain, substate => {
    const topQuestions = substate.get('topQuestions');

    if (topQuestions.size === 0) {
      return [];
    }

    return topQuestions;
  });

const selectQuestionFilter = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionFilter'),
  );

const selectQuestions = (
  isFeed,
  communityId,
  questionId,
  getTopQuestions = false,
) =>
  createSelector(
    makeSelectFollowedCommunities(),
    selectQuestionsList(),
    selectTopQuestions(),
    selectQuestionFilter(),
    (followedCommunities, questionsList, topQuestions, questionFilter) => {
      if ((questionFilter && !questionId) || getTopQuestions) {
        return topQuestions;
      }

      if (communityId) {
        return questionsList.filter(x => x.community_id === communityId);
      }

      if (isFeed && followedCommunities) {
        return questionsList.filter(x =>
          followedCommunities.includes(x.community_id),
        );
      }

      if (questionId) {
        return questionsList.find(x => x.id === questionId);
      }

      return questionsList;
    },
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

const selectTypeFilter = () =>
  createSelector(selectQuestionsDomain, substate => substate.get('typeFilter'));

const selectCreatedFilter = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('createdFilter'),
  );

const selectTopQuestionsLoaded = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('topQuestionsLoaded'),
  );

const selectTopQuestionActionProcessing = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('topQuestionActionProcessing'),
  );

export {
  selectQuestionsDomain,
  selectQuestionsLoading,
  selectQuestionsList,
  selectQuestionsError,
  selectInitLoadedItems,
  selectNextLoadedItems,
  selectIsLastFetch,
  selectFollowedCommunities,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
  selectQuestions,
  selectTypeFilter,
  selectCreatedFilter,
  selectTopQuestions,
  selectTopQuestionsLoaded,
  selectQuestionFilter,
  selectTopQuestionActionProcessing,
};
