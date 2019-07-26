import { Login } from '../index';

import {
  EMAIL_FORM,
  EMAIL_PASSWORD_FORM,
  WE_ARE_HAPPY_FORM,
} from '../constants';

const cmp = new Login();

cmp.props = {
  content: null,
  showModal: true,
  hideLoginModalDispatch: jest.fn(),
  locale: 'en',
  email: 'email',
  loginProcessing: false,
  finishRegistrationProcessing: false,
  loginWithScatterDispatch: jest.fn(),
  showEmailPasswordFormDispatch: jest.fn(),
  loginWithEmailDispatch: jest.fn(),
  finishRegistrationDispatch: jest.fn(),
  showForgotPasswordModalDispatch: jest.fn(),
};

describe('<Login />', () => {
  describe('showIForgotPasswordModal', () => {
    expect(cmp.props.hideLoginModalDispatch).toHaveBeenCalledTimes(0);
    expect(cmp.props.showForgotPasswordModalDispatch).toHaveBeenCalledTimes(0);

    cmp.showIForgotPasswordModal();

    expect(cmp.props.hideLoginModalDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.showForgotPasswordModalDispatch).toHaveBeenCalledTimes(1);
  });

  describe('render', () => {
    it('content === EMAIL_FORM', () => {
      cmp.props.content = EMAIL_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('content === EMAIL_PASSWORD_FORM', () => {
      cmp.props.content = EMAIL_PASSWORD_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('content === WE_ARE_HAPPY_FORM', () => {
      cmp.props.content = WE_ARE_HAPPY_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
