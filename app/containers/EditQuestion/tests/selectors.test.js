import { fromJS } from 'immutable';
import {
  selectEditQuestionDomain,
  selectQuestion,
  selectQuestionLoading,
  selectGetAskedQuestionError,
  selectEditQuestionLoading,
  selectEditQuestionError,
} from '../selectors';

describe('selectEditQuestionDomain', () => {
  const question = 'question';
  const questionLoading = true;
  const getAskedQuestionError = 'getAskedQuestionError';
  const editQuestionLoading = true;
  const editQuestionError = 'editQuestionError';

  const globalState = fromJS({
    question,
    questionLoading,
    getAskedQuestionError,
    editQuestionLoading,
    editQuestionError,
  });

  const mockedState = fromJS({
    editQuestion: globalState,
  });

  it('should select the global state', () => {
    expect(selectEditQuestionDomain(mockedState)).toEqual(globalState);
  });

  it('selectQuestion', () => {
    const isQuestion = selectQuestion();
    expect(isQuestion(mockedState)).toEqual(question);
  });

  it('selectQuestionLoading', () => {
    const isQuestionLoading = selectQuestionLoading();
    expect(isQuestionLoading(mockedState)).toEqual(questionLoading);
  });

  it('selectGetAskedQuestionError', () => {
    const isGetAskedQuestionError = selectGetAskedQuestionError();
    expect(isGetAskedQuestionError(mockedState)).toEqual(getAskedQuestionError);
  });

  it('selectEditQuestionLoading', () => {
    const isEditQuestionLoading = selectEditQuestionLoading();
    expect(isEditQuestionLoading(mockedState)).toEqual(editQuestionLoading);
  });

  it('selectEditQuestionError', () => {
    const isEditQuestionError = selectEditQuestionError();
    expect(isEditQuestionError(mockedState)).toEqual(editQuestionError);
  });
});
