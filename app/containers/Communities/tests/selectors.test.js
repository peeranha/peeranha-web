import { fromJS } from 'immutable';
import {
  selectSuggestedCommunitiesDomain,
  selectSuggestedCommunities,
  selectSuggestedCommunitiesLoading,
  selectSuggestedCommunitiesError,
  selectIsLastFetch,
  selectLimit,
} from '../selectors';

describe('selectSuggestedCommunitiesDomain', () => {
  const suggestedCommunities = [];
  const getSuggestedCommunitiesLoading = false;
  const getSuggestedCommunitiesError = null;
  const isLastFetch = false;
  const limit = 10;

  const globalState = fromJS({
    suggestedCommunities,
    getSuggestedCommunitiesLoading,
    getSuggestedCommunitiesError,
    isLastFetch,
    limit,
  });

  const mockedState = fromJS({
    suggestedCommunities: globalState,
  });

  it('should select the global state', () => {
    expect(selectSuggestedCommunitiesDomain(mockedState)).toEqual(globalState);
  });

  it('selectSuggestedCommunities', () => {
    const isSelectSuggestedCommunities = selectSuggestedCommunities();
    expect(isSelectSuggestedCommunities(mockedState)).toEqual(
      suggestedCommunities,
    );
  });

  it('selectCommunitiesLoading', () => {
    const isSelectSuggestedCommunitiesLoading = selectSuggestedCommunitiesLoading();
    expect(isSelectSuggestedCommunitiesLoading(mockedState)).toEqual(
      getSuggestedCommunitiesLoading,
    );
  });

  it('selectCommunitiesError', () => {
    const isSelectSuggestedCommunitiesError = selectSuggestedCommunitiesError();
    expect(isSelectSuggestedCommunitiesError(mockedState)).toEqual(
      getSuggestedCommunitiesError,
    );
  });

  it('selectIsLastFetch', () => {
    const isSelectIsLastFetch = selectIsLastFetch();
    expect(isSelectIsLastFetch(mockedState)).toEqual(isLastFetch);
  });

  it('selectLimit', () => {
    const isSelectLimit = selectLimit();
    expect(isSelectLimit(mockedState)).toEqual(limit);
  });
});
