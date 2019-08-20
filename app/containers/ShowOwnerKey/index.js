/**
 *
 * ShowOwnerKey
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

import { showOwnerKey, showOwnerKeyModal, hideOwnerKeyModal, sendEmail } from './actions';

import { SUBMIT_EMAIL_FORM, EMAIL_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ShowOwnerKey extends React.PureComponent {
  render() {
    const {
      showOwnerKeyDispatch,
      hideOwnerKeyModalDispatch,
      children,
      showOwnerKeyModalDispatch,
      showModal,
      showOwnerKeyProcessing,
      locale,
      content,
      sendEmailProcessing,
      sendEmailDispatch,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideOwnerKeyModalDispatch}>
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
              showOwnerKey={showOwnerKeyDispatch}
              showOwnerKeyProcessing={showOwnerKeyProcessing}
            />
          )}
        </Modal>

        <button onClick={showOwnerKeyModalDispatch}>{children}</button>
      </React.Fragment>
    );
  }
}

ShowOwnerKey.propTypes = {
  showOwnerKeyDispatch: PropTypes.func,
  hideOwnerKeyModalDispatch: PropTypes.func,
  showOwnerKeyModalDispatch: PropTypes.func,
  children: PropTypes.any,
  showOwnerKeyProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  showOwnerKeyProcessing: selectors.selectShowOwnerKeyProcessing(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    showOwnerKeyDispatch: (...args) => dispatch(showOwnerKey(args)),
    sendEmailDispatch: (...args) => dispatch(sendEmail(args)),
    showOwnerKeyModalDispatch: () => dispatch(showOwnerKeyModal()),
    hideOwnerKeyModalDispatch: () => dispatch(hideOwnerKeyModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showOwnerKey', reducer });
const withSaga = injectSaga({ key: 'showOwnerKey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowOwnerKey);
