import {
  fetchRegisterAcc,
  registerAccSuccess,
  registerAccError,
  setReducerDefault,
} from '../actions';

import {
  FETCH_REGISTER_ACC,
  REGISTER_ACC_SUCCESS,
  REGISTER_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from '../constants';

describe('SignUp actions', () => {
  describe('fetchRegisterAcc Action', () => {
    it('has a type of FETCH_REGISTER_ACC', () => {
      const expected = {
        type: FETCH_REGISTER_ACC,
        obj: {
          test: true,
        },
      };
      expect(fetchRegisterAcc({ test: true })).toEqual(expected);
    });
  });

  describe('registerAccSuccess Action', () => {
    it('has a type of REGISTER_ACC_SUCCESS', () => {
      const expected = {
        type: REGISTER_ACC_SUCCESS,
      };
      expect(registerAccSuccess()).toEqual(expected);
    });
  });

  describe('registerAccError Action', () => {
    it('has a type of REGISTER_ACC_ERROR', () => {
      const expected = {
        type: REGISTER_ACC_ERROR,
        error: {
          test: true,
        },
      };
      expect(registerAccError({ test: true })).toEqual(expected);
    });
  });

  describe('setReducerDefault Action', () => {
    it('has a type of REGISTER_ACC_SUCCESS', () => {
      const expected = {
        type: SET_REDUCER_DEFAULT,
      };
      expect(setReducerDefault()).toEqual(expected);
    });
  });
});
