import {
  getCurrentAccount,
  getCurrentAccountSuccess,
  getCurrentAccountError,
} from '../actions';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from '../constants';

describe('getCurrentAccount actions', () => {
  it('has a type of GET_CURRENT_ACCOUNT', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT,
    };
    expect(getCurrentAccount()).toEqual(expected);
  });

  it('has a type of GET_CURRENT_ACCOUNT_SUCCESS', () => {
    const account = 'account';
    const profileInfo = 'profileInfo';

    const expected = {
      type: GET_CURRENT_ACCOUNT_SUCCESS,
      account,
      profileInfo,
    };

    expect(getCurrentAccountSuccess(account, profileInfo)).toEqual(expected);
  });

  it('has a type of GET_CURRENT_ACCOUNT_ERROR', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT_ERROR,
      err: {
        message: 'error',
      },
    };
    expect(getCurrentAccountError({ message: 'error' })).toEqual(expected);
  });
});
