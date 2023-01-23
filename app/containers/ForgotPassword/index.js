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
  sendAnotherCode,
} from './actions';

import { EMAIL_FORM, NEW_PASSWORD_FORM } from './constants';

import EmailForm from './EmailForm';
import NewPasswordForm from './NewPasswordForm';

export class ForgotPassword extends React.Component {
  render() {
    const {
      getVerificationCodeDispatch,
      hideForgotPasswordModalDispatch,
      changePasswordDispatch,
      showModal,
      content,
      verificationCodeLoading,
      locale,
      changePasswordLoading,
      sendAnotherCodeDispatch,
    } = this.props;

    return (
      <ModalDialog
        show={showModal}
        closeModal={hideForgotPasswordModalDispatch}
      >
        {content === EMAIL_FORM && (
          <EmailForm
            getVerificationCode={getVerificationCodeDispatch}
            verificationCodeLoading={verificationCodeLoading}
          />
        )}

        {content === NEW_PASSWORD_FORM && (
          <NewPasswordForm
            changePassword={changePasswordDispatch}
            sendAnotherCode={sendAnotherCodeDispatch}
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
  sendAnotherCodeDispatch: PropTypes.func,
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
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
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
