import { ForgotPassword } from '../index';

import {
  EMAIL_FORM,
  VERIFICATION_CODE_FORM,
  NEW_PASSWORD_FORM,
} from '../constants';

const cmp = new ForgotPassword();

beforeEach(() => {
  cmp.props = {
    getVerificationCodeDispatch: jest.fn(),
    hideForgotPasswordModalDispatch: jest.fn(),
    verifyEmailDispatch: jest.fn(),
    changePasswordDispatch: jest.fn(),
    showModal: true,
    content: null,
    verificationCodeLoading: false,
    locale: 'en',
    verifyEmailLoading: false,
    changePasswordLoading: false,
  };
});

describe('<ForgotPassword />', () => {
  describe('render', () => {
    it('content === EMAIL_FORM', () => {
      cmp.props.content = EMAIL_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('content === VERIFICATION_CODE_FORM', () => {
      cmp.props.content = VERIFICATION_CODE_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('content === NEW_PASSWORD_FORM', () => {
      cmp.props.content = NEW_PASSWORD_FORM;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
