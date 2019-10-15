import {
  createCommunity,
  createCommunitySuccess,
  createCommunityErr,
  setDefaultStore,
} from '../actions';

import {
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  SET_DEFAULT_STORE,
} from '../constants';

describe('createCommunity actions', () => {
  it('SET_DEFAULT_STORE', () => {
    const expected = {
      type: SET_DEFAULT_STORE,
    };

    expect(setDefaultStore()).toEqual(expected);
  });

  it('CREATE_COMMUNITY', () => {
    const community = 'community';
    const reset = 'reset';

    const expected = {
      type: CREATE_COMMUNITY,
      community,
      reset,
    };

    expect(createCommunity(community, reset)).toEqual(expected);
  });

  it('CREATE_COMMUNITY_SUCCESS', () => {
    const expected = {
      type: CREATE_COMMUNITY_SUCCESS,
    };

    expect(createCommunitySuccess()).toEqual(expected);
  });

  it('CREATE_COMMUNITY_ERROR', () => {
    const createCommunityError = 'createCommunityError';

    const expected = {
      type: CREATE_COMMUNITY_ERROR,
      createCommunityError,
    };

    expect(createCommunityErr(createCommunityError)).toEqual(expected);
  });
});
