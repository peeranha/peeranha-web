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

describe('AccountProvider actions', () => {
  it('has a type of GET_CURRENT_ACCOUNT', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT,
    };
    expect(getCurrentAccount()).toEqual(expected);
  });
  it('has a type of GET_CURRENT_ACCOUNT_SUCCESS', () => {
    const expected = {
      type: GET_CURRENT_ACCOUNT_SUCCESS,
      acc: {
        name: 'test',
      },
    };
    expect(getCurrentAccountSuccess({ name: 'test' })).toEqual(expected);
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
