import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectEditAnswerDomain = state =>
  state.get('editAnswer', initialState);

export const selectAnswer = () =>
  createSelector(selectEditAnswerDomain, substate => substate.get('answer'));

export const selectAnswerError = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('getAnswerError'),
  );

export const selectAnswerLoading = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('answerLoading'),
  );

export const selectEditAnswerError = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('editAnswerError'),
  );

export const selectEditAnswerLoading = () =>
  createSelector(selectEditAnswerDomain, substate =>
    substate.get('editAnswerLoading'),
  );
