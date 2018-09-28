import accountInitializerReducer from '../reducer';

describe('accountInitializerReducer', () => {
  const obj = { value: true };
  it('returns the initial state', () => {
    expect(accountInitializerReducer(obj, {})).toEqual(obj);
  });
});
