import { fromJS } from 'immutable';
import {
  selectCreateTagDomain,
  selectSuggestTagLoading,
  selectSuggestTagError,
} from '../selectors';

describe('selectCreateTagDomain', () => {
  const suggestTagLoading = false;
  const suggestTagError = null;

  const globalState = fromJS({
    suggestTagLoading,
    suggestTagError,
  });

  const mockedState = fromJS({
    createTag: globalState,
  });

  it('should select the global state', () => {
    expect(selectCreateTagDomain(mockedState)).toEqual(globalState);
  });

  it('selectIsImageLoading', () => {
    const isSelectSuggestTagLoading = selectSuggestTagLoading();
    expect(isSelectSuggestTagLoading(mockedState)).toEqual(suggestTagLoading);
  });

  it('selectIsImageLoading', () => {
    const isSelectSuggestTagError = selectSuggestTagError();
    expect(isSelectSuggestTagError(mockedState)).toEqual(suggestTagError);
  });
});
