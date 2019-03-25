import { fromJS } from 'immutable';
import {
  selectAskQuestionDomain,
  selectQuestionData,
  selectAskQuestionLoading,
  selectQuestionError,
} from '../selectors';

describe('selectAskQuestionDomain', () => {
  const questionData = fromJS({});
  const askQuestionLoading = false;
  const questionError = 'questionError';

  const globalState = fromJS({
    questionData,
    askQuestionLoading,
    questionError,
  });

  const mockedState = fromJS({
    askQuestionReducer: globalState,
  });

  it('should select the global state', () => {
    expect(selectAskQuestionDomain(mockedState)).toEqual(globalState);
  });

  it('selectQuestionData', () => {
    const isQuestionData = selectQuestionData();
    expect(isQuestionData(mockedState)).toEqual(questionData);
  });

  it('selectAskQuestionLoading', () => {
    const isAskQuestionLoading = selectAskQuestionLoading();
    expect(isAskQuestionLoading(mockedState)).toEqual(askQuestionLoading);
  });

  it('selectQuestionError', () => {
    const isQuestionError = selectQuestionError();
    expect(isQuestionError(mockedState)).toEqual(questionError);
  });
});
