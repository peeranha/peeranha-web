import { scrollToTopRegExps } from './constants';

export const showScrollToTop = path =>
  !!scrollToTopRegExps.find(regExp => regExp.test(path));
