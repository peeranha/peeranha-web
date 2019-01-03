import { fromJS } from 'immutable';
import {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
} from '../selectors';

describe('selectDataCacheProviderDomain', () => {
  const communities = [];
  const communitiesLoading = false;
  const getCommunitiesWithTagsError = null;

  const globalState = fromJS({
    communities,
    communitiesLoading,
    getCommunitiesWithTagsError,
  });

  const mockedState = fromJS({
    askQuestionReducer: globalState,
  });

  it('should select the global state', () => {
    expect(selectDataCacheProviderDomain(mockedState)).toEqual(globalState);
  });

  it('selectCommunities', () => {
    const isCommunities = selectCommunities();
    expect(isCommunities(mockedState)).toEqual(communities);
  });

  it('selectCommunitiesLoading', () => {
    const isSelectCommunitiesLoading = selectCommunitiesLoading();
    expect(isSelectCommunitiesLoading(mockedState)).toEqual(communitiesLoading);
  });

  it('selectCommunitiesLoading', () => {
    const isSelectGetCommunitiesWithTagsError = selectGetCommunitiesWithTagsError();
    expect(isSelectGetCommunitiesWithTagsError(mockedState)).toEqual(
      getCommunitiesWithTagsError,
    );
  });
});
