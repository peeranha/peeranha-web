import { fromJS } from 'immutable';
import suggestedCommunitiesReducer, { initialState } from '../reducer';

import {
  getSuggestedCommunities,
  getSuggestedCommunitiesSuccess,
  getSuggestedCommunitiesErr,
} from '../actions';

describe('suggestedCommunitiesReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
      suggestedCommunities: [],
    });
  });

  it('returns the initial state', () => {
    expect(suggestedCommunitiesReducer(state, {})).toEqual(state);
  });

  it('getSuggestedCommunities', () => {
    const obj = state.set('getSuggestedCommunitiesLoading', true);

    expect(
      suggestedCommunitiesReducer(state, getSuggestedCommunities()),
    ).toEqual(obj);
  });

  it('getSuggestedCommunitiesSuccess', () => {
    const suggestedCommunities = [];

    const obj = state
      .set('getSuggestedCommunitiesLoading', false)
      .set(
        'suggestedCommunities',
        state.toJS().suggestedCommunities.concat(suggestedCommunities),
      )
      .set(
        'isLastFetch',
        suggestedCommunities.length < initialState.get('limit'),
      );

    expect(
      suggestedCommunitiesReducer(
        state,
        getSuggestedCommunitiesSuccess(suggestedCommunities),
      ),
    ).toEqual(obj);
  });

  it('getSuggestedCommunitiesErr', () => {
    const getSuggestedCommunitiesError = 'getSuggestedCommunitiesError';
    const obj = state
      .set('getSuggestedCommunitiesLoading', false)
      .set('getSuggestedCommunitiesError', getSuggestedCommunitiesError);

    expect(
      suggestedCommunitiesReducer(
        state,
        getSuggestedCommunitiesErr(getSuggestedCommunitiesError),
      ),
    ).toEqual(obj);
  });
});
