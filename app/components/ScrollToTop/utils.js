import { scrollToTopPaths } from './constants';

export const showScrollToTop = path =>
  !!scrollToTopPaths.find(regExp => regExp.test(path));
