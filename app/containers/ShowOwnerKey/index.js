/**
 *
 * ShowOwnerKey
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

import Modal from 'components/ModalDialog';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import SubmitEmailForm from './SubmitEmailForm';
import EmailForm from './EmailForm';

import {
  showOwnerKey,
  showOwnerKeyModal,
  hideOwnerKeyModal,
  sendEmail,
} from './actions';

import { SUBMIT_EMAIL_FORM, EMAIL_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ShowOwnerKey extends React.PureComponent {
  render() /* istanbul ignore next */ {
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
  sendEmailProcessing: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  sendEmailDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  showOwnerKeyProcessing: selectors.selectShowOwnerKeyProcessing(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showOwnerKeyDispatch: bindActionCreators(showOwnerKey, dispatch),
    sendEmailDispatch: bindActionCreators(sendEmail, dispatch),
    showOwnerKeyModalDispatch: bindActionCreators(showOwnerKeyModal, dispatch),
    hideOwnerKeyModalDispatch: bindActionCreators(hideOwnerKeyModal, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showOwnerKey', reducer });
const withSaga = injectSaga({ key: 'showOwnerKey', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowOwnerKey);
