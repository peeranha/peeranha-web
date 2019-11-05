import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import showActiveKeyReducer, { initialState } from '../reducer';

import {
  showActiveKey,
  showActiveKeySuccess,
  showActiveKeyErr,
  showActiveKeyModal,
  hideActiveKeyModal,
  removeActiveKey,
} from '../actions';

describe('showActiveKeyReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(showActiveKeyReducer(state, {})).toEqual(state);
  });

  it('removeActiveKey', () => {
    const obj = state.set('activeKey', initialState.get('activeKey'));
    expect(showActiveKeyReducer(state, removeActiveKey())).toEqual(obj);
  });

  it('showActiveKeyModal', () => {
    const obj = state.set('showModal', true);
    expect(showActiveKeyReducer(state, showActiveKeyModal())).toEqual(obj);
  });

  it('hideActiveKeyModal', () => {
    const obj = state.set('showModal', false);
    expect(showActiveKeyReducer(state, hideActiveKeyModal())).toEqual(obj);
  });

  it('showActiveKey', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('showActiveKeyProcessing', true);

    expect(showActiveKeyReducer(state, showActiveKey(...args))).toEqual(obj);
  });

  it('showActiveKeySuccess', () => {
    const activeKey = 'activeKey';
    const obj = state
      .set('showActiveKeyProcessing', false)
      .set('activeKey', activeKey)
      .set('showModal', initialState.get('showModal'));

    expect(
      showActiveKeyReducer(state, showActiveKeySuccess(activeKey)),
    ).toEqual(obj);
  });

  it('showActiveKeyErr', () => {
    const showActiveKeyError = 'showActiveKeyError';
    const obj = state
      .set('showActiveKeyProcessing', false)
      .set('showActiveKeyError', showActiveKeyError);

    expect(
      showActiveKeyReducer(state, showActiveKeyErr(showActiveKeyError)),
    ).toEqual(obj);
  });

  it('LOCATION_CHANGE', () => {
    expect(showActiveKeyReducer(state, { type: LOCATION_CHANGE })).toEqual(
      initialState,
    );
  });
});
