import { scrollToSection } from 'utils/animation';
import { HomePage } from '../index';
import { EMAIL_FIELD } from '../constants';

jest.mock('utils/animation', () => ({
  scrollToSection: jest.fn(),
}));

const cmp = new HomePage();

cmp.props = {
  locale: 'en',
  account: 'user1',
  checkEmailDispatch: jest.fn(),
  emailChecking: true,
  sendMessageLoading: true,
  sendMessageDispatch: jest.fn(),
  faqQuestions: [],
};

const off = jest.fn();
const on = jest.fn();

window.$ = jest.fn(() => ({
  off,
  on,
}));

describe('HomePage', () => {
  describe('checkEmail', () => {
    const val = new Map();
    const email = 'email';

    val.set(EMAIL_FIELD, email);

    it('test', () => {
      cmp.checkEmail(val);
      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledWith(email);
    });
  });

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
});
