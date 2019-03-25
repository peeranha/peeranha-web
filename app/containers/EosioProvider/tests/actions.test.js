import { initEosio, initEosioSuccess, initEosioError } from '../actions';
import { INIT_EOSIO, INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from '../constants';

describe('EosioProvider actions', () => {
  it('has a type of INIT_EOSIO', () => {
    const expected = {
      type: INIT_EOSIO,
    };
    expect(initEosio()).toEqual(expected);
  });
  it('has a type of INIT_EOSIO_SUCCESS', () => {
    const expected = {
      type: INIT_EOSIO_SUCCESS,
      eos: {},
    };
    expect(initEosioSuccess({})).toEqual(expected);
  });
  it('has a type of INIT_EOSIO_ERROR', () => {
    const expected = {
      type: INIT_EOSIO_ERROR,
      error: {
        message: 'error',
      },
    };
    expect(initEosioError({ message: 'error' })).toEqual(expected);
  });
});
