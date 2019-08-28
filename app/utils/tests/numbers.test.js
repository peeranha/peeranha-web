import {
  getFormattedNum,
  getFormattedNum2,
  getFormattedNum3,
  getFormattedNum4,
} from '../numbers';

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

describe('getFormattedNum3', () => {
  it('test', () => {
    const num = 1000;
    expect(getFormattedNum3(num)).toBe('1 000.000000');
  });
});

describe('getFormattedNum4', () => {
  it('test', () => {
    const num = 1000;
    expect(getFormattedNum4(num)).toBe('1 000.00');
  });
});
