import {
  followHandler,
  followHandlerSuccess,
  followHandlerErr,
} from '../actions';

import {
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from '../constants';

describe('followHandler actions', () => {
  it('FOLLOW_HANDLER', () => {
    const communityIdFilter = 'communityIdFilter';
    const isFollowed = 'isFollowed';

    const expected = {
      type: FOLLOW_HANDLER,
      communityIdFilter,
      isFollowed,
    };

    expect(followHandler(communityIdFilter, isFollowed)).toEqual(expected);
  });

  it('FOLLOW_HANDLER_SUCCESS', () => {
    const communityIdFilter = 'communityIdFilter';
    const isFollowed = 'isFollowed';

    const expected = {
      type: FOLLOW_HANDLER_SUCCESS,
      communityIdFilter,
      isFollowed,
    };

    expect(followHandlerSuccess({ communityIdFilter, isFollowed })).toEqual(
      expected,
    );
  });

  it('FOLLOW_HANDLER_ERROR', () => {
    const followHandlerError = 'followHandlerError';

    const expected = {
      type: FOLLOW_HANDLER_ERROR,
      followHandlerError,
    };

    expect(followHandlerErr(followHandlerError)).toEqual(expected);
  });
});
