import {
  reviewAccount,
  reviewAccountSuccess,
  reviewAccountError,
} from '../actions';

import {
  REVIEW_ACCOUNT,
  REVIEW_ACCOUNT_SUCCESS,
  REVIEW_ACCOUNT_ERROR,
} from '../constants';

describe('AccountInitializer actions', () => {
  it('has a type of REVIEW_ACCOUNT', () => {
    const expected = {
      type: REVIEW_ACCOUNT,
    };
    expect(reviewAccount()).toEqual(expected);
  });
  it('has a type of REVIEW_ACCOUNT_SUCCESS', () => {
    const expected = {
      type: REVIEW_ACCOUNT_SUCCESS,
      acc: {
        name: 'test',
      },
    };
    expect(reviewAccountSuccess({ name: 'test' })).toEqual(expected);
  });
  it('has a type of REVIEW_ACCOUNT_ERROR', () => {
    const expected = {
      type: REVIEW_ACCOUNT_ERROR,
      err: {
        message: 'error',
      },
    };
    expect(reviewAccountError({ message: 'error' })).toEqual(expected);
  });
});
