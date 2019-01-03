import { fromJS } from 'immutable';

import dataCacheProviderReducer from '../reducer';

import {
  getCommunitiesWithTags,
  getCommunitiesWithTagsSuccess,
  getCommunitiesWithTagsErr,
} from '../actions';

describe('dataCacheProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(dataCacheProviderReducer(state, {})).toEqual(state);
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
});
