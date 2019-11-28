/**
 *
 * ChangePasswordByPrevious
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
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';

import Modal from 'components/ModalDialog';
import Button from 'components/Button/Contained/TransparentSmall';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import ChangePasswordForm from './ChangePasswordForm';
import SubmitEmailForm from './SubmitEmailForm';
import EmailForm from './EmailForm';

import {
  showChangePasswordModal,
  hideChangePasswordModal,
  sendEmail,
  submitEmail,
  changePassword,
  sendAnotherCode,
} from './actions';

import {
  EMAIL_FORM,
  VERIFY_EMAIL_FORM,
  CHANGE_PASSWORD_FORM,
} from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ChangePasswordByPrevious extends React.PureComponent {
  render() {
    const {
      hideChangePasswordModalDispatch,
      showChangePasswordModalDispatch,
      children,
      showModal,
      locale,
      content,
      sendEmailProcessing,
      sendEmailDispatch,
      submitEmailDispatch,
      submitEmailProcessing,
      changePasswordDispatch,
      changePasswordProcessing,
      sendAnotherCodeDispatch,
      loginData,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideChangePasswordModalDispatch}>
          {content === EMAIL_FORM && (
            <EmailForm
              locale={locale}
              sendEmail={sendEmailDispatch}
              sendEmailProcessing={sendEmailProcessing}
              loginData={loginData}
            />
          )}

          {content === VERIFY_EMAIL_FORM && (
            <SubmitEmailForm
              locale={locale}
              submitEmail={submitEmailDispatch}
              submitEmailProcessing={submitEmailProcessing}
              sendAnotherCode={sendAnotherCodeDispatch}
            />
          )}

          {content === CHANGE_PASSWORD_FORM && (
            <ChangePasswordForm
              locale={locale}
              changePassword={changePasswordDispatch}
              changePasswordProcessing={changePasswordProcessing}
            />
          )}
        </Modal>

        <Button onClick={showChangePasswordModalDispatch}>{children}</Button>
      </React.Fragment>
    );
  }
}

ChangePasswordByPrevious.propTypes = {
  hideChangePasswordModalDispatch: PropTypes.func,
  showChangePasswordModalDispatch: PropTypes.func,
  children: PropTypes.any,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  sendEmailProcessing: PropTypes.bool,
  sendEmailDispatch: PropTypes.func,
  submitEmailDispatch: PropTypes.func,
  submitEmailProcessing: PropTypes.bool,
  changePasswordDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
  changePasswordProcessing: PropTypes.bool,
  loginData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
  submitEmailProcessing: selectors.selectSubmitEmailProcessing(),
  changePasswordProcessing: selectors.selectChangePasswordProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    sendEmailDispatch: bindActionCreators(sendEmail, dispatch),
    submitEmailDispatch: bindActionCreators(submitEmail, dispatch),
    changePasswordDispatch: bindActionCreators(changePassword, dispatch),
    showChangePasswordModalDispatch: bindActionCreators(
      showChangePasswordModal,
      dispatch,
    ),
    hideChangePasswordModalDispatch: bindActionCreators(
      hideChangePasswordModal,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showChangePassword', reducer });
const withSaga = injectSaga({ key: 'showChangePassword', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePasswordByPrevious);
