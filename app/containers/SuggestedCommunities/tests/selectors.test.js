import { fromJS } from 'immutable';
import {
  selectSuggestedCommunitiesDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectCommunitiesError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
} from '../selectors';

describe('selectSuggestedCommunitiesDomain', () => {
  const communities = [];
  const getSuggestedCommunitiesLoading = false;
  const getSuggestedCommunitiesError = null;
  const upVoteLoading = false;
  const upVoteError = null;
  const downVoteLoading = false;
  const downVoteError = null;

  const globalState = fromJS({
    communities,
    getSuggestedCommunitiesLoading,
    getSuggestedCommunitiesError,
    upVoteLoading,
    upVoteError,
    downVoteLoading,
    downVoteError,
  });

  const mockedState = fromJS({
    suggestedCommunities: globalState,
  });

  it('should select the global state', () => {
    expect(selectSuggestedCommunitiesDomain(mockedState)).toEqual(globalState);
  });

  it('selectCommunities', () => {
    const isSelectCommunities = selectCommunities();
    expect(isSelectCommunities(mockedState)).toEqual(communities);
  });

  it('selectCommunitiesLoading', () => {
    const isSelectCommunitiesLoading = selectCommunitiesLoading();
    expect(isSelectCommunitiesLoading(mockedState)).toEqual(
      getSuggestedCommunitiesLoading,
    );
  });

  it('selectCommunitiesError', () => {
    const isSelectCommunitiesError = selectCommunitiesError();
    expect(isSelectCommunitiesError(mockedState)).toEqual(
      getSuggestedCommunitiesError,
    );
  });

  it('selectUpVoteLoading', () => {
    const isSelectUpVoteLoading = selectUpVoteLoading();
    expect(isSelectUpVoteLoading(mockedState)).toEqual(upVoteLoading);
  });

  it('selectUpVoteError', () => {
    const isSelectUpVoteError = selectUpVoteError();
    expect(isSelectUpVoteError(mockedState)).toEqual(upVoteError);
  });

  it('selectDownVoteLoading', () => {
    const isSelectDownVoteLoading = selectDownVoteLoading();
    expect(isSelectDownVoteLoading(mockedState)).toEqual(downVoteLoading);
  });

  it('selectDownVoteError', () => {
    const isSelectDownVoteError = selectDownVoteError();
    expect(isSelectDownVoteError(mockedState)).toEqual(downVoteError);
  });
});
