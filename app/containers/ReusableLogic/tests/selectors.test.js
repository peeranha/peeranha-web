import { fromJS } from 'immutable';
import {
  selectReusableLogicDomain,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
  selectUpVoteLoading,
  selectUpVoteError,
  selectDownVoteLoading,
  selectDownVoteError,
} from '../selectors';

describe('selectReusableLogicDomain', () => {
  const followHandlerLoading = false;
  const followHandlerError = null;

  const upVoteLoading = false;
  const upVoteError = null;
  const downVoteLoading = false;
  const downVoteError = null;

  const globalState = fromJS({
    followHandlerLoading,
    followHandlerError,
    upVoteLoading,
    upVoteError,
    downVoteLoading,
    downVoteError,
  });

  const mockedState = fromJS({
    reusableLogic: globalState,
  });

  it('should select the global state', () => {
    expect(selectReusableLogicDomain(mockedState)).toEqual(globalState);
  });

  it('selectFollowHandlerLoading', () => {
    const isSelectFollowHandlerLoading = selectFollowHandlerLoading();
    expect(isSelectFollowHandlerLoading(mockedState)).toEqual(
      followHandlerLoading,
    );
  });

  it('selectFollowHandlerError', () => {
    const isSelectFollowHandlerError = selectFollowHandlerError();
    expect(isSelectFollowHandlerError(mockedState)).toEqual(followHandlerError);
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
