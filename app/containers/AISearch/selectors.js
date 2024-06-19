import { initialState } from 'containers/AISearch/reducer';
import { createSelector } from 'reselect';

export const aiSearchDomain = (state) => state.get('aiSearchReducer', initialState);

export const selectQuestions = () =>
  createSelector(aiSearchDomain, (substate) => [
    ...substate.toJS().questions.map((item) => item.concat('')),
  ]);

export const selectAnswers = () =>
  createSelector(aiSearchDomain, (substate) => [
    ...substate.toJS().answers.map((item) => ({
      ...item,
    })),
  ]);

export const selectChatStarted = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('chatStarted'));

export const selectGenerationStopped = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('generationStopped'));

export const selectThreadId = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('threadId'));

export const selectSearchResultLoading = () =>
  createSelector(aiSearchDomain, (substate) => substate.get('searchResultLoading'));
