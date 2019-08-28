import { fromJS } from 'immutable';

import {
  selectAccountProviderDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAccount,
  makeSelectProfileInfo,
  makeSelectFollowedCommunities,
  makeSelectBalance,
} from '../selectors';

describe('selectAccountProviderDomain', () => {
  const loading = 'loading';
  const error = 'error';
  const account = 'account';
  const balance = 'balance';
  const profileInfo = fromJS({});

  const accountProviderState = fromJS({
    loading,
    error,
    account,
    profileInfo,
    balance,
  });

  const user1 = {
    followed_communities: [1, 2, 3],
    profile: {},
  };

  const dataCacheProviderState = fromJS({
    users: {},
  });

  const mockedState = fromJS({
    accountProvider: accountProviderState,
    dataCacheProvider: dataCacheProviderState,
  });

  it('should select the global state', () => {
    expect(selectAccountProviderDomain(mockedState)).toEqual(
      accountProviderState.toJS(),
    );
  });

  describe('makeSelectFollowedCommunities', () => {
    const isMakeSelectFollowedCommunities = makeSelectFollowedCommunities();

    it('profileInfo FALSE', () => {
      expect(
        isMakeSelectFollowedCommunities(
          fromJS({
            ...mockedState.toJS(),
            dataCacheProvider: dataCacheProviderState.set('users', {
              unknownUser: {},
            }),
            accountProvider: {
              ...accountProviderState.toJS(),
              account: 'unknown_account',
            },
          }),
        ),
      ).toEqual(null);
    });

    it('profileInfo TRUE', () => {
      expect(
        isMakeSelectFollowedCommunities(
          fromJS({
            ...mockedState.toJS(),
            dataCacheProvider: dataCacheProviderState.set('users', {
              user1,
            }),
            accountProvider: {
              ...accountProviderState.toJS(),
              account: 'user1',
            },
          }),
        ),
      ).toEqual([1, 2, 3]);
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

  it('makeSelectBalance', () => {
    const isSelectedBalance = makeSelectBalance();
    expect(isSelectedBalance(mockedState)).toEqual(balance);
  });

  it('makeSelectProfileInfo', () => {
    const isProfileInfo = makeSelectProfileInfo();

    expect(
      isProfileInfo(
        fromJS({
          ...mockedState.toJS(),
          dataCacheProvider: dataCacheProviderState.set('users', {
            user1,
          }),
          accountProvider: {
            ...accountProviderState.toJS(),
            account: 'user1',
          },
        }),
      ),
    ).toEqual({
      ...user1,
      balance,
    });
  });
});
