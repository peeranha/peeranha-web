import { fromJS } from 'immutable';
import eosioProviderReducer from '../reducer';
import { initEosio, initEosioSuccess, initEosioError } from '../actions';

describe('eosioProviderReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      initializing: false,
      initialized: false,
      scatterInstalled: false,
      scatterInstance: null,
      eosioInstance: null,
      error: null,
    });
  });

  it('returns the initial state', () => {
    expect(eosioProviderReducer(state, {})).toEqual(state);
  });

  it('getCurrentAccount has to set into state @loading as true', () => {
    const obj = state.set('initializing', true);
    expect(eosioProviderReducer(state, initEosio())).toEqual(obj);
  });

  it('getCurrentAccountSuccess has to set into state @loading as false and @acc as obj', () => {
    const scatterInstalled = true;
    const scatterInstance = { name: 'scatterInstance' };
    const eosioInstance = { name: 'eosioInstance' };

    const obj = state
      .set('initializing', false)
      .set('initialized', true)
      .set('scatterInstalled', scatterInstalled)
      .set('scatterInstance', scatterInstance)
      .set('eosioInstance', eosioInstance);
    expect(
      eosioProviderReducer(
        state,
        initEosioSuccess(eosioInstance, scatterInstalled, scatterInstance),
      ),
    ).toEqual(obj);
  });

  it('getCurrentAccountError has to set into state @loading as false and @err as obj', () => {
    const err = {};
    const obj = state.set('initializing', false).set('error', err);
    expect(eosioProviderReducer(state, initEosioError(err))).toEqual(obj);
  });
});
