import { fromJS } from 'immutable';

import profileReducer from '../reducer';

import {
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoError,
} from '../actions';

describe('profileReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(profileReducer(state, {})).toEqual(state);
  });

  it('getProfileInfo: set @loading true', () => {
    const obj = state.set('userKey', true).set('isProfileLoading', true);
    expect(profileReducer(state, getProfileInfo(true))).toEqual(obj);
  });

  it('getProfileInfoSuccess: returns user profile', () => {
    const obj = state
      .set('profile', { name: 'test' })
      .set('isProfileLoading', false);
    expect(
      profileReducer(state, getProfileInfoSuccess({ name: 'test' })),
    ).toEqual(obj);
  });

  it('getProfileInfoError: returns error message', () => {
    const obj = state
      .set('errorLoadProfile', 'error')
      .set('profile', null)
      .set('isProfileLoading', false);
    expect(profileReducer(state, getProfileInfoError('error'))).toEqual(obj);
  });
});
