import { fromJS } from 'immutable';
import {
  selectVoteForNewCommunityButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
} from '../selectors';

describe('selectVoteForNewCommunityButtonDomain', () => {
  const upVoteLoading = false;
  const upVoteError = null;
  const downVoteLoading = false;
  const downVoteError = null;

  const globalState = fromJS({
    upVoteLoading,
    upVoteError,
    downVoteLoading,
    downVoteError,
  });

  const mockedState = fromJS({
    suggestedCommunities: globalState,
  });

  it('should select the global state', () => {
    expect(selectVoteForNewCommunityButtonDomain(mockedState)).toEqual(
      globalState,
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
