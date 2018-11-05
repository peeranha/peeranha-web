import { stringLength, required } from '../validate';

describe('validate function', () => {
  const str = 'stringstringstring121';
  it('undefined', () => {
    const str1 = 'string';
    expect(stringLength(str1.length - 1, 20)(str1)).toEqual(undefined);
  });
  it('it has to return string if param @max is less than length of string', () => {
    expect(typeof stringLength(0, 20)(str)).toBe('string');
  });
  it('it has to return string if param @min is more than length of string', () => {
    expect(typeof stringLength(str.length + 1, 20)(str)).toBe('string');
  });
});

describe('required function', () => {
  const str = 'string';
  it('it has to return undefined if string.length is not false', () => {
    expect(!!str === true).toBe(true);
    expect(required(str)).toBe(undefined);
  });
});
