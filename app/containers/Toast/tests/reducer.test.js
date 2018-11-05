import { fromJS } from 'immutable';
import toastReducer from '../reducer';

import { addToast, removeToast } from '../actions';

const mathRandom = 0.6789123412;
Math.random = jest.fn().mockImplementation(() => mathRandom);

describe('toastReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      toasts: [
        {
          type: 'info',
          text: 'text0',
          toastKey: '123456',
        },
        {
          type: 'info',
          text: 'text1',
          toastKey: '1234567',
        },
        {
          type: 'info',
          text: 'text2',
          toastKey: '12345678',
        },
      ],
    });
  });

  it('returns the initial state', () => {
    expect(toastReducer(state, {})).toEqual(state);
  });

  it('addToast', () => {
    const toast = {
      type: 'info',
      text: 'text',
      toastKey: mathRandom.toString().slice(2),
    };
    const obj = state.set('toasts', [...state.get('toasts'), toast]);
    expect(toastReducer(state, addToast(toast))).toEqual(obj);
  });

  it('removeToast', () => {
    const toastKey = '123456';
    const obj = state.set(
      'toasts',
      state.get('toasts').filter(x => x.toastKey !== toastKey),
    );
    expect(toastReducer(state, removeToast(toastKey))).toEqual(obj);
  });
});
