/**
 *
 * DeleteAccount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Modal from 'components/ModalDialog';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import SubmitEmailForm from './SubmitEmailForm';
import EmailForm from './EmailForm';

import {
  sendEmail,
  deleteAccount,
  showDeleteAccountModal,
  hideDeleteAccountModal,
} from './actions';

import { SUBMIT_EMAIL_FORM, EMAIL_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class DeleteAccount extends React.PureComponent {
  render() {
    const {
      deleteAccountDispatch,
      children,
      showDeleteAccountModalDispatch,
      hideDeleteAccountModalDispatch,
      showModal,
      deleteAccountProcessing,
      locale,
      content,
      sendEmailProcessing,
      sendEmailDispatch,
      render,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideDeleteAccountModalDispatch}>
          {content === EMAIL_FORM && (
            <EmailForm
              locale={locale}
              sendEmail={sendEmailDispatch}
              sendEmailProcessing={sendEmailProcessing}
            />
          )}

          {content === SUBMIT_EMAIL_FORM && (
            <SubmitEmailForm
              locale={locale}
              deleteAccount={deleteAccountDispatch}
              deleteAccountProcessing={deleteAccountProcessing}
            />
          )}
        </Modal>

        {render({ onClick: showDeleteAccountModalDispatch })}
      </React.Fragment>
    );
  }
}

DeleteAccount.propTypes = {
  deleteAccountDispatch: PropTypes.func,
  hideDeleteAccountModalDispatch: PropTypes.func,
  deleteAccountModalDispatch: PropTypes.func,
  children: PropTypes.any,
  deleteAccountProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  deleteAccountProcessing: selectors.selectDeleteAccountProcessing(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteAccountDispatch: (...args) => dispatch(deleteAccount(args)),
    sendEmailDispatch: (...args) => dispatch(sendEmail(args)),
    showDeleteAccountModalDispatch: () => dispatch(showDeleteAccountModal()),
    hideDeleteAccountModalDispatch: () => dispatch(hideDeleteAccountModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'deleteAccount', reducer });
const withSaga = injectSaga({ key: 'deleteAccount', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DeleteAccount);
