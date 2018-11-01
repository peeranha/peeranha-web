/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import defaultSaga, { addToastWorker } from '../saga';
import { ADD_TOAST, REMOVE_TIMEOUT, REMOVE_TOAST } from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.useFakeTimers();

describe('addToastWorker', () => {
  const toast = {
    addedToast: {
      toastKey: 'toastKey',
    },
  };
  const generator = addToastWorker(toast);

  it('setTimeout', () => {
    generator.next();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      REMOVE_TIMEOUT,
    );
  });

  it('removeToast after setTimeout', () => {
    const step = generator.next();
    expect(step.value.type).toBe(REMOVE_TOAST);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('ADD_TOAST', () => {
    const step = generator.next();
    expect(step.value).toBe(ADD_TOAST);
  });
});
