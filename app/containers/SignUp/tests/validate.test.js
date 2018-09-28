import { stringLength, required } from '../validate';

describe('validate function', () => {
  const str = 'string';
  it('it has to return undefined if param @min is less than length of string', () => {
    expect(stringLength(str.length - 1, 100)(str)).toEqual(undefined);
  });
  it('it has to return string if param @max is less than length of string', () => {
    expect(typeof stringLength(0, str.length - 1)(str)).toBe('string');
  });
  it('it has to return string if param @min is more than length of string', () => {
    expect(typeof stringLength(str.length + 1, 100)(str)).toBe('string');
  });
});

describe('required function', () => {
  const str = 'string';
  it('it has to return undefined if string.length is not false', () => {
    expect(!!str === true).toBe(true);
    expect(required(str)).toBe(undefined);
  });
});
