import { showScrollToTop } from '../utils';

describe('showScrollToTop function', () => {
  it('should return true if pathes matches regexps from scrollToTopPaths array', () => {
    const pathName1 = '/';
    const pathName2 = '/questions/community/1';
    const pathName3 = '/questions/community/1/';
    const pathName4 = '/questions/community/121/';
    const pathName5 = '/questions/community/12/';
    expect(showScrollToTop(pathName1)).toBeTruthy();
    expect(showScrollToTop(pathName2)).toBeTruthy();
    expect(showScrollToTop(pathName3)).toBeTruthy();
    expect(showScrollToTop(pathName4)).toBeTruthy();
    expect(showScrollToTop(pathName5)).toBeTruthy();
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
    expect(showScrollToTop(pathName1)).toBeFalsy();
    expect(showScrollToTop(pathName2)).toBeFalsy();
    expect(showScrollToTop(pathName3)).toBeFalsy();
    expect(showScrollToTop(pathName4)).toBeFalsy();
    expect(showScrollToTop(pathName5)).toBeFalsy();
    expect(showScrollToTop(pathName6)).toBeFalsy();
    expect(showScrollToTop(pathName7)).toBeFalsy();
    expect(showScrollToTop(pathName8)).toBeFalsy();
    expect(showScrollToTop(pathName9)).toBeFalsy();
    expect(showScrollToTop(pathName10)).toBeFalsy();
    expect(showScrollToTop(pathName11)).toBeFalsy();
    expect(showScrollToTop(pathName12)).toBeFalsy();
    expect(showScrollToTop(pathName13)).toBeFalsy();
    expect(showScrollToTop(pathName14)).toBeFalsy();
  });
});
