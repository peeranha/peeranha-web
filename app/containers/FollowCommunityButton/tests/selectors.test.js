import { fromJS } from 'immutable';
import {
  selectFollowCommunityButtonDomain,
  selectFollowHandlerLoading,
  selectFollowHandlerError,
} from '../selectors';

describe('selectFollowCommunityButtonDomain', () => {
  const followHandlerLoading = false;
  const followHandlerError = null;

  const globalState = {
    followHandlerLoading,
    followHandlerError,
  };

  const mockedState = fromJS({
    followCommunityButton: globalState,
  });

  it('should select the global state', () => {
    expect(selectFollowCommunityButtonDomain(mockedState)).toEqual(globalState);
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
});
