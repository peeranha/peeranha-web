import { getFormattedNum, getFormattedNum2 } from '../numbers';

describe('getFormattedNum', () => {
  it('test', () => {
    const num = 1000;
    expect(getFormattedNum(num)).toBe('1,000');
  });
});

describe('getFormattedNum2', () => {
  it('test', () => {
    const num = 1000;
    expect(getFormattedNum2(num)).toBe('1k');
  });
});
