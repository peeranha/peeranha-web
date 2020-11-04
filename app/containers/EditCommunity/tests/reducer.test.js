import { fromJS } from 'immutable';

import {
  editCommunity,
  editCommunityError,
  editCommunitySuccess,
  getCommunity,
  getCommunityError,
  getCommunitySuccess,
} from '../actions';
import editCommunityReducer from '../reducer';

describe('editCommunityReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      community: null,
      editCommunityError: null,
      editCommunityLoading: false,
      getCommunityError: null,
      getCommunityLoading: false,
    });
  });

  it('returns the initial state', () => {
    expect(editCommunityReducer(initialState, {})).toEqual(
      fromJS(initialState),
    );
  });

  it('editCommunity', () => {
    const communityId = 0;
    const communityData = 'communityData';

    const state = initialState.set('editCommunityLoading', true);

    expect(
      editCommunityReducer(
        initialState,
        editCommunity(communityId, communityData),
      ),
    ).toEqual(fromJS(state));
  });

  it('editCommunityError', () => {
    const error = 'error';

    const state = initialState
      .set('editCommunityError', error)
      .set('editCommunityLoading', false);

    expect(
      editCommunityReducer(initialState, editCommunityError(error)),
    ).toEqual(fromJS(state));
  });

  it('editCommunitySuccess', () => {
    const state = initialState.set('editCommunityLoading', false);

    expect(editCommunityReducer(initialState, editCommunitySuccess())).toEqual(
      fromJS(state),
    );
  });

  it('getCommunity', () => {
    const communityId = 0;

    const state = initialState.set('getCommunityLoading', true);

    expect(
      editCommunityReducer(initialState, getCommunity(communityId)),
    ).toEqual(fromJS(state));
  });

  it('getCommunityError', () => {
    const error = 'error';

    const state = initialState
      .set('getCommunityError', error)
      .set('getCommunityLoading', false);

    expect(
      editCommunityReducer(initialState, getCommunityError(error)),
    ).toEqual(fromJS(state));
  });

  it('getCommunitySuccess', () => {
    const community = 'community';

    const state = initialState
      .set('community', community)
      .set('getCommunityLoading', false);

    expect(
      editCommunityReducer(initialState, getCommunitySuccess(community)),
    ).toEqual(fromJS(state));
  });
});
