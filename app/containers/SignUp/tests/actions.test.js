import {
  fetchRegistrAcc,
  registrAccSuccess,
  registrAccError,
  setReducerDefault,
} from '../actions';

import {
  FETCH_REGISTR_ACC,
  REGISTR_ACC_SUCCESS,
  REGISTR_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from '../constants';

describe('SignUp actions', () => {
  describe('fetchRegistrAcc Action', () => {
    it('has a type of FETCH_REGISTR_ACC', () => {
      const expected = {
        type: FETCH_REGISTR_ACC,
        obj: {
          test: true,
        },
      };
      expect(fetchRegistrAcc({ test: true })).toEqual(expected);
    });
  });

  describe('registrAccSuccess Action', () => {
    it('has a type of REGISTR_ACC_SUCCESS', () => {
      const expected = {
        type: REGISTR_ACC_SUCCESS,
      };
      expect(registrAccSuccess()).toEqual(expected);
    });
  });

  describe('registrAccError Action', () => {
    it('has a type of REGISTR_ACC_ERROR', () => {
      const expected = {
        type: REGISTR_ACC_ERROR,
        error: {
          test: true,
        },
      };
      expect(registrAccError({ test: true })).toEqual(expected);
    });
  });

  describe('setReducerDefault Action', () => {
    it('has a type of REGISTR_ACC_SUCCESS', () => {
      const expected = {
        type: SET_REDUCER_DEFAULT,
      };
      expect(setReducerDefault()).toEqual(expected);
    });
  });
});
