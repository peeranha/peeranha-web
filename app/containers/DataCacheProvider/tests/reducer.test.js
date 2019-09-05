import { fromJS } from 'immutable';

import dataCacheProviderReducer from '../reducer';

import {
  getCommunitiesWithTags,
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileErr,
  getStat,
  getStatSuccess,
  getStatErr,
  getFaq,
  getFaqSuccess,
  getFaqErr,
} from '../actions';

/* eslint indent: 0 */
describe('dataCacheProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
      users: {},
    });
  });

  it('returns the initial state', () => {
    expect(dataCacheProviderReducer(state, {})).toEqual(state);
  });

  it('getStat', () => {
    const obj = state.set('statLoading', true);

    expect(dataCacheProviderReducer(state, getStat())).toEqual(obj);
  });

  it('getStatSuccess', () => {
    const stat = 'stat';
    const obj = state.set('statLoading', false).set('stat', stat);

    expect(dataCacheProviderReducer(state, getStatSuccess(stat))).toEqual(obj);
  });

  it('getStatError', () => {
    const getStatError = 'getStatError';
    const obj = state
      .set('statLoading', false)
      .set('getStatError', getStatError);

    expect(dataCacheProviderReducer(state, getStatErr(getStatError))).toEqual(
      obj,
    );
  });

  it('getCommunitiesWithTags', () => {
    const obj = state.set('communitiesLoading', true);

    expect(dataCacheProviderReducer(state, getCommunitiesWithTags())).toEqual(
      obj,
    );
  });

  it('getCommunitiesWithTagsSuccess', () => {
    const communities = [];
    const obj = state
      .set('communitiesLoading', false)
      .set('communities', communities);

    expect(
      dataCacheProviderReducer(
        state,
        getCommunitiesWithTagsSuccess(communities),
      ),
    ).toEqual(obj);
  });

  it('getCommunitiesWithTagsErr', () => {
    const getCommunitiesWithTagsError = 'getCommunitiesWithTagsError';
    const obj = state
      .set('communitiesLoading', false)
      .set('getCommunitiesWithTagsError', getCommunitiesWithTagsError);

    expect(
      dataCacheProviderReducer(
        state,
        getCommunitiesWithTagsErr(getCommunitiesWithTagsError),
      ),
    ).toEqual(obj);
  });

  it('getUserProfile', () => {
    const obj = state.set('usersLoading', true);
    expect(dataCacheProviderReducer(state, getUserProfile())).toEqual(obj);
  });

  it('getUserProfileSuccess', () => {
    const profile = {
      user: 'user',
    };

    const obj = state.set('usersLoading', false).set(
      'users',
      profile
        ? fromJS({
            ...state.get('users').toJS(),
            [profile.user]: profile,
          })
        : state.get('users'),
    );

    expect(
      dataCacheProviderReducer(state, getUserProfileSuccess(profile)),
    ).toEqual(obj);
  });

  it('getUserProfileErr', () => {
    const getUserProfileError = 'getUserProfileError';
    const obj = state
      .set('usersLoading', false)
      .set('getUserProfileError', getUserProfileError);

    expect(
      dataCacheProviderReducer(state, getUserProfileErr(getUserProfileError)),
    ).toEqual(obj);
  });

  it('getFaq', () => {
    const obj = state.set('getFaqLoading', true);
    expect(dataCacheProviderReducer(state, getFaq())).toEqual(obj);
  });

  it('getFaq', () => {
    const obj = state.set('getFaqLoading', true);
    expect(dataCacheProviderReducer(state, getFaq())).toEqual(obj);
  });

  it('getFaqSuccess', () => {
    const faq = [];
    const obj = state.set('getFaqLoading', false).set('faq', faq);

    expect(dataCacheProviderReducer(state, getFaqSuccess(faq))).toEqual(obj);
  });

  it('getFaqSuccess', () => {
    const getFaqError = 'getFaqError';
    const obj = state
      .set('getFaqLoading', false)
      .set('getFaqError', getFaqError);

    expect(dataCacheProviderReducer(state, getFaqErr(getFaqError))).toEqual(
      obj,
    );
  });
});
