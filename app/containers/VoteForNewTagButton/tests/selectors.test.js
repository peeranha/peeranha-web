import { fromJS } from 'immutable';
import {
  selectVoteForNewTagButtonDomain,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
} from '../selectors';

describe('selectVoteForNewTagButtonDomain', () => {
  const upVoteLoading = false;
  const upVoteError = null;
  const downVoteLoading = false;
  const downVoteError = null;
  const ids = [];

  const globalState = {
    upVoteLoading,
    upVoteError,
    downVoteLoading,
    downVoteError,
    ids,
  };

  const mockedState = fromJS({
    suggestedCommunities: globalState,
  });

  it('should select the global state', () => {
    expect(selectVoteForNewTagButtonDomain(mockedState)).toEqual(globalState);
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
