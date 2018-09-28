import signUpReducer from '../reducer';

describe('signUpReducer', () => {
  const obj = { value: true };
  it('returns the initial state', () => {
    expect(signUpReducer(obj, {})).toEqual(obj);
  });
});
