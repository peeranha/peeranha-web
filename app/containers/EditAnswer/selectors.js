import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editAnswer state domain
 */

const selectEditAnswerDomain = state => state.get('editAnswer', initialState);

const selectAnswer = () =>
  createSelector(selectEditAnswerDomain, substate => substate.get('answer'));

const selectAnswerError = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('getAnswerError'),
  );

const selectAnswerLoading = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('answerLoading'),
  );

const selectEditAnswerError = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('editAnswerError'),
  );

const selectEditAnswerLoading = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('editAnswerLoading'),
  );

export {
  selectEditAnswerDomain,
  selectAnswer,
  selectAnswerError,
  selectAnswerLoading,
  selectEditAnswerError,
  selectEditAnswerLoading,
};
