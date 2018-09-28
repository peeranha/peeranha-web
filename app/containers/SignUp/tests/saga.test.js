/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { resistrAccWorker } from '../saga';

import { REGISTR_ACC_SUCCESS } from '../constants';

describe('resistrAccWorker Saga', () => {
  it('Checking, step2 is action with REGISTR_ACC_SUCCESS type', () => {
    const generator = resistrAccWorker({
      obj: {
        eosAccount: 'acc',
        displayName: 'name',
      },
    });
    generator.next();
    const step = generator.next();
    expect(step.value.PUT.action.type).toBe(REGISTR_ACC_SUCCESS);
  });
});
