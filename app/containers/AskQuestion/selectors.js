import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the askQuestion state domain
 */

const selectAskQuestionDomain = state =>
  state.get('askQuestionReducer', initialState);

export const selectQuestionData = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('questionData'),
  );

export const selectAskQuestionLoading = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('askQuestionLoading'),
  );

export const selectQuestionError = () =>
  createSelector(selectAskQuestionDomain, substate =>
    substate.get('questionError'),
  );

export { selectAskQuestionDomain };
