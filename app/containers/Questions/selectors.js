import { createSelector } from 'reselect';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { initialState } from './reducer';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
const single = isSingleCommunityWebsite();

export const selectQuestionsDomain = state =>
  state.get('questionsReducer', initialState);

export const selectQuestionsLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsLoading'),
  );

export const selectTopQuestionsLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('topQuestionsLoading'),
  );

export const selectQuestionsObject = createSelector(
  selectQuestionsDomain,
  substate => substate.get('questions').toJS(),
);

export const selectQuestionIdsList = createSelector(
  selectQuestionsDomain,
  substate => substate.toJS().questionsList,
);

export const selectQuestionsList = () =>
  createSelector(
    selectQuestionIdsList,
    selectQuestionsObject,
    (ids, questions) => ids.map(id => questions[id]),
  );

export const selectTopQuestionIds = createSelector(
  selectQuestionsDomain,
  substate => substate.toJS().topQuestionIds,
);

export const selectTopQuestions = () =>
  createSelector(
    selectTopQuestionIds,
    selectQuestionsObject,
    (ids, questions) => ids.map(id => questions[id]).filter(Boolean),
  );

export const selectQuestionFilter = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionFilter'),
  );

export const selectQuestions = (
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
        return questionsList.filter(
          x => Number(x.communityId) === Number(communityId),
        );
      }

      if (isFeed && single) {
        return questionsList;
      }

      if (isFeed && followedCommunities) {
        return questionsList.filter(x =>
          followedCommunities.includes(+x.communityId),
        );
      }

      if (questionId) {
        return questionsList?.find(x => Number(x.id) === Number(questionId));
      }

      return questionsList;
    },
  );

export const selectQuestionsError = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('questionsError'),
  );

export const selectPromotedQuestions = () =>
  createSelector(
    selectQuestionsDomain,
    substate => substate.toJS().promotedQuestions,
  );

export const selectInitLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('initLoadedItems'),
  );

export const selectLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('loadedItems'),
  );

export const selectNextLoadedItems = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('nextLoadedItems'),
  );

export const selectIsLastFetch = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('isLastFetch'),
  );

export const selectFollowedCommunities = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followedCommunities'),
  );

export const selectFollowHandlerLoading = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followHandlerLoading'),
  );

export const selectFollowHandlerError = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('followHandlerError'),
  );

export const selectTypeFilter = () =>
  createSelector(selectQuestionsDomain, substate => substate.get('typeFilter'));

export const selectCreatedFilter = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('createdFilter'),
  );

export const selectTopQuestionsInfoLoaded = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('topQuestionsInfoLoaded'),
  );

export const selectTopQuestionActionProcessing = () =>
  createSelector(selectQuestionsDomain, substate =>
    substate.get('topQuestionActionProcessing'),
  );

export const isQuestionTop = questionId =>
  createSelector(selectTopQuestionIds, ids => ids.includes(questionId));

export const selectLastLoadedTopQuestionIndex = createSelector(
  selectQuestionsDomain,
  substate => substate.get('lastLoadedTopQuestionIndex'),
);

export const isLastTopQuestionLoadedSelector = createSelector(
  selectLastLoadedTopQuestionIndex,
  selectTopQuestionIds,
  (lastIndex, ids) => lastIndex >= ids.length,
);
