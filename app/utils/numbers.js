import numeral from 'numeral';

// 3000 => 3,000
export const getFormattedNum = num => numeral(num).format('0,0');

// -104000 => -104k
export const getFormattedNum2 = num => numeral(num).format('0a');
