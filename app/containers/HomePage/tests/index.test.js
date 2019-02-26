import { scrollToSection } from 'utils/animation';

import { HomePage, mapDispatchToProps } from '../index';

import messages from '../messages';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from '../constants';

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

jest.mock('utils/animation', () => ({
  scrollToSection: jest.fn(),
}));

describe('HomePage', () => {
  describe('componentDidMount', () => {
    cmp.imagesAnimation = jest.fn();

    cmp.headerAnimation = jest.fn();

    cmp.parallaxAnimation = jest.fn();

    it('test', () => {
      expect(scrollToSection).toHaveBeenCalledTimes(0);
      expect(cmp.imagesAnimation).toHaveBeenCalledTimes(0);
      expect(cmp.headerAnimation).toHaveBeenCalledTimes(0);
      expect(cmp.parallaxAnimation).toHaveBeenCalledTimes(0);

      cmp.componentDidMount();

      expect(scrollToSection).toHaveBeenCalledTimes(1);
      expect(cmp.imagesAnimation).toHaveBeenCalledTimes(1);
      expect(cmp.headerAnimation).toHaveBeenCalledTimes(1);
      expect(cmp.parallaxAnimation).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(window.$).toHaveBeenCalledWith(window);
      expect(off).toHaveBeenCalled();
    });
  });

  describe('sendEmail', () => {
    it('test', () => {
      const mapp = new Map().set(EMAIL_FIELD, EMAIL_FIELD);
      const form = 'form1';
      const reset = jest.fn();

      const formData = {
        email: mapp.get(EMAIL_FIELD),
      };

      const pageInfo = {
        url: window.location.href,
        name: `${messages.title.defaultMessage} | ${form}`,
      };

      cmp.sendEmail(mapp, () => {}, {
        form,
        reset,
      });

      expect(cmp.props.sendEmailDispatch).toHaveBeenCalledWith(
        formData,
        reset,
        pageInfo,
      );
    });
  });

  describe('sendMessage', () => {
    it('test', () => {
      const mapp = new Map()
        .set(EMAIL_FIELD, EMAIL_FIELD)
        .set(NAME_FIELD, NAME_FIELD)
        .set(SUBJECT_FIELD, SUBJECT_FIELD)
        .set(MESSAGE_FIELD, MESSAGE_FIELD);

      const form = 'form122';
      const reset = jest.fn();

      const formData = {
        email: mapp.get(EMAIL_FIELD),
        firstname: mapp.get(NAME_FIELD),
        subject: mapp.get(SUBJECT_FIELD),
        message: mapp.get(MESSAGE_FIELD),
      };

      const pageInfo = {
        url: window.location.href,
        name: `${messages.title.defaultMessage} | ${form}`,
      };

      cmp.sendMessage(mapp, () => {}, {
        form,
        reset,
      });

      expect(cmp.props.sendMessageDispatch).toHaveBeenCalledWith(
        formData,
        reset,
        pageInfo,
      );
    });
  });

  describe('render', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).sendEmailDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).sendMessageDispatch()).toBe(test);
    });
  });
});
