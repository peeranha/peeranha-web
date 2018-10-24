/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { getCurrentAccountWorker } from '../saga';

import {
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
} from '../constants';

describe('getCurrentAccountWorker Saga', () => {
  const generator = getCurrentAccountWorker({});
  it('Checking, step2 is action with GET_CURRENT_ACCOUNT_SUCCESS type', () => {
    generator.next();
    const step = generator.next();
    expect(step.value.PUT.action.type).toBe(GET_CURRENT_ACCOUNT_SUCCESS);
  });

  it('Error: Completing action with GET_CURRENT_ACCOUNT_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(GET_CURRENT_ACCOUNT_ERROR);
  });
});
