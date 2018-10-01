/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { resistrAccWorker } from '../saga';

import { REGISTR_ACC_SUCCESS, REGISTR_ACC_ERROR } from '../constants';

describe('resistrAccWorker Saga', () => {
  const generator = resistrAccWorker({
    obj: {
      eosAccount: 'acc',
      displayName: 'name',
    },
  });
  it('Checking, step2 is action with REGISTR_ACC_SUCCESS type', () => {
    generator.next();
    const step = generator.next();
    expect(step.value.PUT.action.type).toBe(REGISTR_ACC_SUCCESS);
  });

  it('Error: Completing action with REGISTR_ACC_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(REGISTR_ACC_ERROR);
  });
});
