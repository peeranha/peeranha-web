import { fromJS } from 'immutable';
import followCommunityButtonReducer from '../reducer';

import {
  followHandler,
  followHandlerSuccess,
  followHandlerErr,
} from '../actions';

describe('followCommunityButtonReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
      followHandlerLoading: false,
      followHandlerError: null,
      ids: [],
    });
  });

  it('returns the initial state', () => {
    expect(followCommunityButtonReducer(state, {})).toEqual(state);
  });

  it('followHandler', () => {
    const communityIdFilter = 0;
    const isFollowed = 0;
    const buttonId = 0;

    const obj = state.set('followHandlerLoading', true).set('ids', [buttonId]);

    expect(
      followCommunityButtonReducer(
        state,
        followHandler(communityIdFilter, isFollowed, buttonId),
      ),
    ).toEqual(obj);
  });

  it('followHandlerSuccess', () => {
    const obj = state.set('followHandlerLoading', false).set('ids', []);

    expect(
      followCommunityButtonReducer(state, followHandlerSuccess({})),
    ).toEqual(obj);
  });

  it('followHandlerErr', () => {
    const followHandlerError = 'followHandlerError';
    const obj = state
      .set('followHandlerLoading', false)
      .set('followHandlerError', followHandlerError)
      .set('ids', []);

    expect(
      followCommunityButtonReducer(state, followHandlerErr(followHandlerError)),
    ).toEqual(obj);
  });
});
