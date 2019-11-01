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

const selectQuestions = (isFeed, communityId, questionId) =>
  createSelector(
    state => state,
    state => {
      const followedCommunities = makeSelectFollowedCommunities()(state);
      const questionsList = selectQuestionsList()(state);

      if (communityId) {
        return questionsList.filter(x => x.community_id === communityId);
      }

      if (isFeed) {
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
};
