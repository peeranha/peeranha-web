import numeral from 'numeral';

export const getFormattedNum = num => numeral(num).format('0,0');
