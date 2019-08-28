/**
 *
 * ChangePasswordByPrevious
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Modal from 'components/ModalDialog';

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
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideChangePasswordModalDispatch}>
          {content === EMAIL_FORM && (
            <EmailForm
              locale={locale}
              sendEmail={sendEmailDispatch}
              sendEmailProcessing={sendEmailProcessing}
            />
          )}

          {content === VERIFY_EMAIL_FORM && (
            <SubmitEmailForm
              locale={locale}
              submitEmail={submitEmailDispatch}
              submitEmailProcessing={submitEmailProcessing}
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

        <button onClick={showChangePasswordModalDispatch}>{children}</button>
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
  changePasswordProcessing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
  submitEmailProcessing: selectors.selectSubmitEmailProcessing(),
  changePasswordProcessing: selectors.selectChangePasswordProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendEmailDispatch: (...args) => dispatch(sendEmail(args)),
    submitEmailDispatch: (...args) => dispatch(submitEmail(args)),
    changePasswordDispatch: (...args) => dispatch(changePassword(args)),
    showChangePasswordModalDispatch: () => dispatch(showChangePasswordModal()),
    hideChangePasswordModalDispatch: () => dispatch(hideChangePasswordModal()),
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
