/**
 *
 * ForgotPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import ModalDialog from 'components/ModalDialog';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  hideForgotPasswordModal,
  getVerificationCode,
  verifyEmail,
  changePassword,
} from './actions';

import {
  EMAIL_FORM,
  VERIFICATION_CODE_FORM,
  NEW_PASSWORD_FORM,
} from './constants';

import EmailForm from './EmailForm';
import VerificationCodeForm from './VerificationCodeForm';
import NewPasswordForm from './NewPasswordForm';

/* eslint-disable react/prefer-stateless-function */
export class ForgotPassword extends React.Component {
  render() /* istanbul ignore next */ {
    const {
      getVerificationCodeDispatch,
      hideForgotPasswordModalDispatch,
      verifyEmailDispatch,
      changePasswordDispatch,
      showModal,
      content,
      verificationCodeLoading,
      locale,
      verifyEmailLoading,
      changePasswordLoading,
    } = this.props;

    return (
      <ModalDialog
        show={showModal}
        closeModal={hideForgotPasswordModalDispatch}
      >
        {content === EMAIL_FORM && (
          <EmailForm
            locale={locale}
            getVerificationCode={getVerificationCodeDispatch}
            verificationCodeLoading={verificationCodeLoading}
          />
        )}

        {content === VERIFICATION_CODE_FORM && (
          <VerificationCodeForm
            locale={locale}
            verifyEmail={verifyEmailDispatch}
            verifyEmailLoading={verifyEmailLoading}
          />
        )}

        {content === NEW_PASSWORD_FORM && (
          <NewPasswordForm
            locale={locale}
            changePassword={changePasswordDispatch}
            changePasswordLoading={changePasswordLoading}
          />
        )}
      </ModalDialog>
    );
  }
}

ForgotPassword.propTypes = {
  getVerificationCodeDispatch: PropTypes.func,
  hideForgotPasswordModalDispatch: PropTypes.func,
  verifyEmailDispatch: PropTypes.func,
  changePasswordDispatch: PropTypes.func,
  showModal: PropTypes.bool,
  content: PropTypes.string,
  verificationCodeLoading: PropTypes.bool,
  locale: PropTypes.string,
  verifyEmailLoading: PropTypes.bool,
  changePasswordLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  verificationCodeLoading: selectors.selectVerificationCodeLoading(),
  verifyEmailLoading: selectors.selectVerifyEmailLoading(),
  changePasswordLoading: selectors.selectChangePasswordLoading(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    hideForgotPasswordModalDispatch: bindActionCreators(
      hideForgotPasswordModal,
      dispatch,
    ),
    getVerificationCodeDispatch: bindActionCreators(
      getVerificationCode,
      dispatch,
    ),
    verifyEmailDispatch: bindActionCreators(verifyEmail, dispatch),
    changePasswordDispatch: bindActionCreators(changePassword, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPassword', reducer });
const withSaga = injectSaga({ key: 'forgotPassword', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPassword);
