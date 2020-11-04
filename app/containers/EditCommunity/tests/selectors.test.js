import { fromJS } from 'immutable';

import {
  selectCommunity,
  selectEditCommunityError,
  selectEditCommunityLoading,
  selectGetCommunityError,
  selectGetCommunityLoading,
} from '../selectors';

describe('selectEditCommunityDomain', () => {
  const community = 'community';
  const editCommunityError = 'editCommunityError';
  const editCommunityLoading = false;
  const getCommunityError = 'getCommunityError';
  const getCommunityLoading = false;

  const state = fromJS({
    editcommunity: {
      community,
      editCommunityError,
      editCommunityLoading,
      getCommunityError,
      getCommunityLoading,
    },
  });

  it('selectCommunity', () => {
    expect(selectCommunity()(state)).toEqual(community);
  });

  it('selectEditCommunityError', () => {
    expect(selectEditCommunityError()(state)).toEqual(editCommunityError);
  });

  it('selectEditCommunityLoading', () => {
    expect(selectEditCommunityLoading()(state)).toEqual(editCommunityLoading);
  });

  it('selectGetCommunityError', () => {
    expect(selectGetCommunityError()(state)).toEqual(getCommunityError);
  });

  it('selectGetCommunityLoading', () => {
    expect(selectGetCommunityLoading()(state)).toEqual(getCommunityLoading);
  });
});
