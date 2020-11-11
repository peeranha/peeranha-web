import { showScrollToTop } from '../utils';

describe('showScrollToTop function', () => {
  it('should return true if pathes matches regexps from scrollToTopPaths array', () => {
    const pathName1 = '/';
    const pathName2 = '/feed';
    const pathName3 = '/feed/';
    const pathName4 = '/questions/community/1';
    const pathName5 = '/questions/community/1/';
    const pathName6 = '/questions/community/121/';
    const pathName7 = '/questions/community/12/';
    expect(showScrollToTop(pathName1)).toBe(true);
    expect(showScrollToTop(pathName2)).toBe(true);
    expect(showScrollToTop(pathName3)).toBe(true);
    expect(showScrollToTop(pathName4)).toBe(true);
    expect(showScrollToTop(pathName5)).toBe(true);
    expect(showScrollToTop(pathName6)).toBe(true);
    expect(showScrollToTop(pathName7)).toBe(true);
  });

  it('should return false if pathes do not matches regexps from scrollToTopPaths array', () => {
    const pathName1 = '';
    const pathName2 = '//';
    const pathName3 = ' //';
    const pathName4 = '/1';
    const pathName5 = '/feed/a';
    const pathName6 = '//feed/a';
    const pathName7 = '/questions/community/';
    const pathName8 = '/questions/community//';
    const pathName9 = '/questions/community/ /';
    const pathName10 = '/questions/community/121/a';
    const pathName11 = '/questions/community/12/ 1';
    const pathName12 = ' /questions/community/12/ 1';
    const pathName13 = '/communities';
    const pathName14 = '/tags';
    expect(showScrollToTop(pathName1)).toBe(false);
    expect(showScrollToTop(pathName2)).toBe(false);
    expect(showScrollToTop(pathName3)).toBe(false);
    expect(showScrollToTop(pathName4)).toBe(false);
    expect(showScrollToTop(pathName5)).toBe(false);
    expect(showScrollToTop(pathName6)).toBe(false);
    expect(showScrollToTop(pathName7)).toBe(false);
    expect(showScrollToTop(pathName8)).toBe(false);
    expect(showScrollToTop(pathName9)).toBe(false);
    expect(showScrollToTop(pathName10)).toBe(false);
    expect(showScrollToTop(pathName11)).toBe(false);
    expect(showScrollToTop(pathName12)).toBe(false);
    expect(showScrollToTop(pathName13)).toBe(false);
    expect(showScrollToTop(pathName14)).toBe(false);
  });
});
