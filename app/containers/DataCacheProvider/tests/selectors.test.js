import { fromJS } from 'immutable';
import React from 'react';

import * as routes from 'routes-config';
import { getQuestionCode } from 'utils/faqManagement';

import A from 'components/A';

import {
  selectDataCacheProviderDomain,
  selectCommunities,
  selectCommunitiesLoading,
  selectGetCommunitiesWithTagsError,
  selectUsers,
  selectUsersLoading,
  selectGetUserProfileError,
  selectStat,
  selectStatLoading,
  selectStatError,
  selectFaq,
  selectFaqQuestions,
  selectGetFaqError,
  selectGetFaqLoading,
} from '../selectors';

describe('selectDataCacheProviderDomain', () => {
  const communities = [];
  const communitiesLoading = false;
  const getCommunitiesWithTagsError = null;
  const users = {};
  const usersLoading = false;
  const getUserProfileError = null;
  const stat = 'stat';
  const statLoading = false;
  const getStatError = 'getStatError';
  const faq = {
    h1: 'h1',
    blocks: [
      {
        h2: 'h2',
        blocks: [
          {
            h3: 'header00',
            content: 'content22',
          },
        ],
      },
      {
        h2: 'h22',
        blocks: [
          {
            h3: 'header10',
            content: 'content33',
          },
        ],
      },
    ],
  };
  const getFaqLoading = false;
  const getFaqError = null;

  const globalState = fromJS({
    communities,
    communitiesLoading,
    getCommunitiesWithTagsError,
    users,
    usersLoading,
    getUserProfileError,
    stat,
    statLoading,
    getStatError,
    faq,
    getFaqLoading,
    getFaqError,
  });

  const mockedState = fromJS({
    dataCacheProvider: globalState,
  });

  it('should select the global state', () => {
    expect(selectDataCacheProviderDomain(mockedState)).toEqual(
      globalState.toJS(),
    );
  });

  it('selectStat', () => {
    const isSelectStat = selectStat();
    expect(isSelectStat(mockedState)).toEqual(stat);
  });

  it('selectStatLoading', () => {
    const isSelectStatLoading = selectStatLoading();
    expect(isSelectStatLoading(mockedState)).toEqual(statLoading);
  });

  it('selectStatError', () => {
    const isSelectStatError = selectStatError();
    expect(isSelectStatError(mockedState)).toEqual(getStatError);
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

  it('selectUsers', () => {
    const isSelectUsers = selectUsers();
    expect(isSelectUsers(mockedState)).toEqual(users);
  });

  it('selectUsersLoading', () => {
    const isSelectUsersLoading = selectUsersLoading();
    expect(isSelectUsersLoading(mockedState)).toEqual(usersLoading);
  });

  it('selectGetUserProfileError', () => {
    const isSelectGetUserProfileError = selectGetUserProfileError();
    expect(isSelectGetUserProfileError(mockedState)).toEqual(
      getUserProfileError,
    );
  });

  it('selectFaq', () => {
    const isSelectFaq = selectFaq();
    expect(isSelectFaq(mockedState)).toEqual(faq);
  });

  it('selectGetFaqLoading', () => {
    const isSelectGetFaqLoading = selectGetFaqLoading();
    expect(isSelectGetFaqLoading(mockedState)).toEqual(getFaqLoading);
  });

  it('selectGetFaqError', () => {
    const isSelectGetFaqError = selectGetFaqError();
    expect(isSelectGetFaqError(mockedState)).toEqual(getFaqError);
  });

  it('selectFaqQuestions', () => {
    const isSelectFaqQuestions = selectFaqQuestions(['0.0', '1.0']);
    expect(isSelectFaqQuestions(mockedState)).toEqual([
      <A to={routes.faq(getQuestionCode(0, 0))}>header00</A>,
      <A to={routes.faq(getQuestionCode(1, 0))}>header10</A>,
    ]);
  });
});
