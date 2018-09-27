import makeSelectSign from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectSign', () => {
  it('makeSelectSign has to return initialState of reducer', () => {
    expect(makeSelectSign()).toEqual(initialState);
  });
});
