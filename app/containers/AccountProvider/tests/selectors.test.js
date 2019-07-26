import { fromJS } from 'immutable';

import {
  selectAccountProviderDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAccount,
  makeSelectProfileInfo,
  makeSelectFollowedCommunities,
} from '../selectors';

describe('selectAccountProviderDomain', () => {
  const loading = 'loading';
  const error = 'error';
  const account = 'account';
  const profileInfo = fromJS({});

  const globalState = fromJS({
    loading,
    error,
    account,
    profileInfo,
  });

  const mockedState = fromJS({
    accountProvider: globalState,
  });

  it('should select the global state', () => {
    expect(selectAccountProviderDomain(mockedState)).toEqual(globalState);
  });

  describe('makeSelectFollowedCommunities', () => {
    const isMakeSelectFollowedCommunities = makeSelectFollowedCommunities();

    it('profileInfo FALSE', () => {
      expect(
        isMakeSelectFollowedCommunities(
          fromJS({
            accountProvider: {
              ...globalState.toJS(),
              profileInfo: null,
            },
          }),
        ),
      ).toEqual(null);
    });

    it('profileInfo TRUE', () => {
      const followedCommunities = [];

      expect(
        isMakeSelectFollowedCommunities(
          fromJS({
            accountProvider: {
              ...globalState.toJS(),
              profileInfo: {
                followed_communities: followedCommunities,
              },
            },
          }),
        ),
      ).toEqual(followedCommunities);
    });
  });

  it('makeSelectAccount', () => {
    const acc = makeSelectAccount();
    expect(acc(mockedState)).toEqual(account);
  });

  it('makeSelectLoading', () => {
    const load = makeSelectLoading();
    expect(load(mockedState)).toEqual(loading);
  });

  it('makeSelectError', () => {
    const err = makeSelectError();
    expect(err(mockedState)).toEqual(error);
  });

  it('makeSelectProfileInfo', () => {
    const isProfileInfo = makeSelectProfileInfo();
    expect(isProfileInfo(mockedState)).toEqual(profileInfo);
  });
});
