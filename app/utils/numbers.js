import numeral from 'numeral';

// 3000 => 3,000
export const getFormattedNum = num => numeral(num).format('0,0');

// -104000 => -104k
export const getFormattedNum2 = num => numeral(num).format('0a');

// 1000000 => 1 000 000.000000
export const getFormattedNum3 = (num, precision = 6) =>
  numeral(num)
    .format(`0,0.${'0'.repeat(precision)}`)
    .replace(/,/gim, ' ');

// 1000000 => 1 000 000.00
export const getFormattedNum4 = num =>
  numeral(num)
    .format('0,0.00')
    .replace(/,/gim, ' ');
