import { fromJS } from 'immutable';

import {
  selectTagsDomain,
  selectSorting,
  selectIsLastFetchForSuggestedTags,
  selectLimit,
  selectExistingTags,
  selectExistingTagsLoading,
  selectExistingTagsError,
  selectText,
  selectIsLastFetchForExistingTags,
} from '../selectors';

describe('selectTagsDomain', () => {
  const suggestedTags = 'suggestedTags';
  const suggestedTagsLoading = 'suggestedTagsLoading';
  const getSuggestedTagsError = 'getSuggestedTagsError';
  const sorting = 'sorting';
  const isLastFetchForSuggestedTags = 'isLastFetchForSuggestedTags';
  const limit = 'limit';
  const existingTags = 'existingTags';
  const existingTagsLoading = 'existingTagsLoading';
  const getExistingTagsError = 'getExistingTagsError';
  const text = 'text';
  const isLastFetchForExistingTags = 'isLastFetchForExistingTags';

  const globalState = fromJS({
    suggestedTags,
    suggestedTagsLoading,
    getSuggestedTagsError,
    sorting,
    isLastFetchForSuggestedTags,
    existingTags,
    existingTagsLoading,
    getExistingTagsError,
    text,
    limit,
    isLastFetchForExistingTags,
  });

  const mockedState = fromJS({
    tags: globalState,
  });

  it('should select the global state', () => {
    expect(selectTagsDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectSorting', () => {
    const isSelectSorting = selectSorting();
    expect(isSelectSorting(mockedState)).toEqual(sorting);
  });

  it('selectIsLastFetchForSuggestedTags', () => {
    const isSelectIsLastFetchForSuggestedTags = selectIsLastFetchForSuggestedTags();
    expect(isSelectIsLastFetchForSuggestedTags(mockedState)).toEqual(
      isLastFetchForSuggestedTags,
    );
  });

  it('selectLimit', () => {
    const isSelectLimit = selectLimit();
    expect(isSelectLimit(mockedState)).toEqual(limit);
  });

  it('selectExistingTags', () => {
    const isSelectExistingTags = selectExistingTags();
    expect(isSelectExistingTags(mockedState)).toEqual(existingTags);
  });

  it('selectExistingTagsLoading', () => {
    const isSelectExistingTagsLoading = selectExistingTagsLoading();
    expect(isSelectExistingTagsLoading(mockedState)).toEqual(
      existingTagsLoading,
    );
  });

  it('selectExistingTagsError', () => {
    const isSelectExistingTagsError = selectExistingTagsError();
    expect(isSelectExistingTagsError(mockedState)).toEqual(
      getExistingTagsError,
    );
  });

  it('selectText', () => {
    const isSelectText = selectText();
    expect(isSelectText(mockedState)).toEqual(text);
  });

  it('selectIsLastFetchForExistingTags', () => {
    const isSelectIsLastFetchForExistingTags = selectIsLastFetchForExistingTags();
    expect(isSelectIsLastFetchForExistingTags(mockedState)).toEqual(
      isLastFetchForExistingTags,
    );
  });
});
