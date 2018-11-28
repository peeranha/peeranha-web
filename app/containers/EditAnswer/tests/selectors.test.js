import { fromJS } from 'immutable';
import {
  selectEditAnswerDomain,
  selectAnswer,
  selectAnswerError,
  selectAnswerLoading,
  selectEditAnswerError,
  selectEditAnswerLoading,
} from '../selectors';

describe('selectEditAnswerDomain', () => {
  const answer = 'answer';
  const getAnswerError = 'getAnswerError';
  const answerLoading = false;
  const editAnswerError = 'editAnswerError';
  const editAnswerLoading = true;

  const globalState = fromJS({
    answer,
    getAnswerError,
    answerLoading,
    editAnswerError,
    editAnswerLoading,
  });

  const mockedState = fromJS({
    editAnswer: globalState,
  });

  it('should select the global state', () => {
    expect(selectEditAnswerDomain(mockedState)).toEqual(globalState);
  });

  it('selectAnswer', () => {
    const isAnswer = selectAnswer();
    expect(isAnswer(mockedState)).toEqual(answer);
  });

  it('selectAnswerError', () => {
    const isAnswerError = selectAnswerError();
    expect(isAnswerError(mockedState)).toEqual(getAnswerError);
  });

  it('selectAnswerLoading', () => {
    const isAnswerLoading = selectAnswerLoading();
    expect(isAnswerLoading(mockedState)).toEqual(answerLoading);
  });

  it('selectEditAnswerError', () => {
    const isEditAnswerError = selectEditAnswerError();
    expect(isEditAnswerError(mockedState)).toEqual(editAnswerError);
  });

  it('selectEditAnswerLoading', () => {
    const isEditAnswerLoading = selectEditAnswerLoading();
    expect(isEditAnswerLoading(mockedState)).toEqual(editAnswerLoading);
  });
});
