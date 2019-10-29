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
    });
  });

  it('returns the initial state', () => {
    expect(followCommunityButtonReducer(state, {})).toEqual(state);
  });

  it('followHandler', () => {
    const obj = state.set('followHandlerLoading', true);

    expect(followCommunityButtonReducer(state, followHandler())).toEqual(obj);
  });

  it('followHandlerSuccess', () => {
    const obj = state.set('followHandlerLoading', false);

    expect(
      followCommunityButtonReducer(state, followHandlerSuccess({})),
    ).toEqual(obj);
  });

  it('followHandlerErr', () => {
    const followHandlerError = 'followHandlerError';
    const obj = state
      .set('followHandlerLoading', false)
      .set('followHandlerError', followHandlerError);

    expect(
      followCommunityButtonReducer(state, followHandlerErr(followHandlerError)),
    ).toEqual(obj);
  });
});
