import { fromJS } from 'immutable';
import {
  selectCreateCommunityDomain,
  selectCreateCommunityLoading,
  selectCreateCommunityError,
} from '../selectors';

describe('selectCreateCommunityDomain', () => {
  const createCommunityLoading = false;
  const createCommunityError = null;

  const globalState = fromJS({
    createCommunityLoading,
    createCommunityError,
  });

  const mockedState = fromJS({
    createCommunity: globalState,
  });

  it('should select the global state', () => {
    expect(selectCreateCommunityDomain(mockedState)).toEqual(globalState);
  });

  it('selectCreateCommunityLoading', () => {
    const isSelectCreateCommunityLoading = selectCreateCommunityLoading();
    expect(isSelectCreateCommunityLoading(mockedState)).toEqual(
      createCommunityLoading,
    );
  });

  it('selectCreateCommunityError', () => {
    const isSelectCreateCommunityError = selectCreateCommunityError();
    expect(isSelectCreateCommunityError(mockedState)).toEqual(
      createCommunityError,
    );
  });
});
