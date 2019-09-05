import { scrollToSection } from 'utils/animation';
import { HomePage } from '../index';

jest.mock('utils/animation', () => ({
  scrollToSection: jest.fn(),
}));

const cmp = new HomePage();

cmp.props = {
  locale: 'en',
  sendEmailLoading: true,
  sendMessageLoading: true,
  sendEmailDispatch: jest.fn(),
  sendMessageDispatch: jest.fn(),
};

const off = jest.fn();
const on = jest.fn();

window.$ = jest.fn(() => ({
  off,
  on,
}));

describe('HomePage', () => {
  describe('componentDidMount', () => {
    cmp.imagesAnimation = jest.fn();

    cmp.headerAnimation = jest.fn();

    cmp.parallaxAnimation = jest.fn();

    it('test', () => {
      expect(cmp.imagesAnimation).toHaveBeenCalledTimes(0);
      expect(cmp.headerAnimation).toHaveBeenCalledTimes(0);
      expect(cmp.parallaxAnimation).toHaveBeenCalledTimes(0);
      expect(scrollToSection).toHaveBeenCalledTimes(0);

      cmp.componentDidMount();

      expect(cmp.imagesAnimation).toHaveBeenCalledTimes(1);
      expect(cmp.headerAnimation).toHaveBeenCalledTimes(1);
      expect(cmp.parallaxAnimation).toHaveBeenCalledTimes(1);
      expect(scrollToSection).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(window.$).toHaveBeenCalledWith(window);
      expect(off).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
