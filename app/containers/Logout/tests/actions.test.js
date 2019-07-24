import { logout, logoutSuccess, logoutErr } from '../actions';
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../constants';

describe('Logout actions', () => {
  it('logout', () => {
    const expected = {
      type: LOGOUT,
    };

    expect(logout()).toEqual(expected);
  });

  it('logoutSuccess', () => {
    const expected = {
      type: LOGOUT_SUCCESS,
    };

    expect(logoutSuccess()).toEqual(expected);
  });

  it('logoutErr', () => {
    const logoutError = 'logoutError';
    const expected = {
      type: LOGOUT_ERROR,
      logoutError,
    };

    expect(logoutErr(logoutError)).toEqual(expected);
  });
});
