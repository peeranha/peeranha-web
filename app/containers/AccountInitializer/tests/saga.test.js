/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { reviewAccountWorker } from '../saga';

import { REVIEW_ACCOUNT_SUCCESS } from '../constants';

describe('reviewAccountWorker Saga', () => {
  const generator = reviewAccountWorker({});
  it('Checking, step2 is action with REVIEW_ACCOUNT_SUCCESS type', () => {
    generator.next();
    const step = generator.next();
    expect(step.value.PUT.action.type).toBe(REVIEW_ACCOUNT_SUCCESS);
  });
});
