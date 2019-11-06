/**
 *
 * DeleteAccount
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
  render() /* istanbul ignore next */ {
    const {
      deleteAccountDispatch,
      hideDeleteAccountModalDispatch,
      showModal,
      deleteAccountProcessing,
      locale,
      showDeleteAccountModalDispatch,
      content,
      sendEmailProcessing,
      sendEmailDispatch,
      render,
      loginData,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideDeleteAccountModalDispatch}>
          {content === EMAIL_FORM && (
            <EmailForm
              locale={locale}
              sendEmail={sendEmailDispatch}
              sendEmailProcessing={sendEmailProcessing}
              loginData={loginData}
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
  deleteAccountProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
  showDeleteAccountModalDispatch: PropTypes.func,
  content: PropTypes.string,
  sendEmailProcessing: PropTypes.bool,
  sendEmailDispatch: PropTypes.func,
  render: PropTypes.func,
  loginData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  deleteAccountProcessing: selectors.selectDeleteAccountProcessing(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    deleteAccountDispatch: bindActionCreators(deleteAccount, dispatch),
    sendEmailDispatch: bindActionCreators(sendEmail, dispatch),
    showDeleteAccountModalDispatch: bindActionCreators(
      showDeleteAccountModal,
      dispatch,
    ),
    hideDeleteAccountModalDispatch: bindActionCreators(
      hideDeleteAccountModal,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'deleteAccount', reducer });
const withSaga = injectSaga({ key: 'deleteAccount', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DeleteAccount);
