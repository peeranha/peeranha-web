import { fromJS } from 'immutable';
import eosioProviderReducer from '../reducer';
import { initEosio, initEosioSuccess, initEosioError } from '../actions';

describe('eosioProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      initializing: true,
      eos: null,
      error: null,
    });
  });

  it('returns the initial state', () => {
    expect(eosioProviderReducer(state, {})).toEqual(state);
  });

  it('initEosio should set @initializing as true', () => {
    const obj = state.set('initializing', true);
    expect(eosioProviderReducer(state, initEosio())).toEqual(obj);
  });

  it('initEosioSuccess should set @initializing as false and @eos as obj', () => {
    const eos = { initialized: true };

    const obj = state.set('initializing', false).set('eos', eos);
    expect(eosioProviderReducer(state, initEosioSuccess(eos))).toEqual(obj);
  });

  it('initEosioError should set @initializing as false and @err as obj', () => {
    const err = {};
    const obj = state.set('initializing', false).set('error', err);
    expect(eosioProviderReducer(state, initEosioError(err))).toEqual(obj);
  });
});
