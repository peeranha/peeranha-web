/**
 *
 * ChangeEmail
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

import SendEmailForm from './SendEmailForm';
import ChangeEmailForm from './ChangeEmailForm';
import ConfirmEmailForm from './ConfirmEmailForm';

import {
  sendOldEmail,
  confirmOldEmail,
  changeEmail,
  showChangeEmailModal,
  hideChangeEmailModal,
} from './actions';

import {
  OLD_EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
} from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ChangeEmail extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      changeEmailDispatch,
      hideChangeEmailModalDispatch,
      children,
      showChangeEmailModalDispatch,
      showModal,
      changeEmailProcessing,
      locale,
      content,
      sendOldEmailDispatch,
      confirmOldEmailDispatch,
      sendOldEmailProcessing,
      confirmOldEmailProcessing,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideChangeEmailModalDispatch}>
          {content === OLD_EMAIL_FORM && (
            <SendEmailForm
              locale={locale}
              sendOldEmail={sendOldEmailDispatch}
              sendOldEmailProcessing={sendOldEmailProcessing}
            />
          )}

          {content === CONFIRM_EMAIL_FORM && (
            <ConfirmEmailForm
              locale={locale}
              confirmOldEmail={confirmOldEmailDispatch}
              confirmOldEmailProcessing={confirmOldEmailProcessing}
            />
          )}

          {content === CHANGE_EMAIL_FORM && (
            <ChangeEmailForm
              locale={locale}
              changeEmail={changeEmailDispatch}
              changeEmailProcessing={changeEmailProcessing}
            />
          )}
        </Modal>

        <button onClick={showChangeEmailModalDispatch}>{children}</button>
      </React.Fragment>
    );
  }
}

ChangeEmail.propTypes = {
  changeEmailDispatch: PropTypes.func,
  hideChangeEmailModalDispatch: PropTypes.func,
  showChangeEmailModalDispatch: PropTypes.func,
  sendOldEmailDispatch: PropTypes.func,
  confirmOldEmailDispatch: PropTypes.func,
  children: PropTypes.any,
  changeEmailProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  sendOldEmailProcessing: PropTypes.bool,
  confirmOldEmailProcessing: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  changeEmailProcessing: selectors.selectChangeEmailProcessing(),
  sendOldEmailProcessing: selectors.selectSendOldEmailProcessing(),
  confirmOldEmailProcessing: selectors.selectConfirmOldEmailProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    changeEmailDispatch: (...args) => dispatch(changeEmail(args)),
    sendOldEmailDispatch: (...args) => dispatch(sendOldEmail(args)),
    confirmOldEmailDispatch: (...args) => dispatch(confirmOldEmail(args)),
    showChangeEmailModalDispatch: () => dispatch(showChangeEmailModal()),
    hideChangeEmailModalDispatch: () => dispatch(hideChangeEmailModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showChangeEmail', reducer });
const withSaga = injectSaga({ key: 'showChangeEmail', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangeEmail);
