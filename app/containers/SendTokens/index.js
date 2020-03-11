/* eslint react/no-children-prop: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Modal from 'components/ModalDialog';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectLoginData,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import {
  hideSendTokensModal,
  showSendTokensModal,
  sendTokens,
} from './actions';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import Button from './StyledButton';
import SendTokensForm from './SendTokensForm';

export const SendTokens = /* istanbul ignore next */ ({
  locale,
  sendTokensDispatch,
  sendTokensProcessing,
  children,
  showModal,
  hideSendTokensModalDispatch,
  showSendTokensModalDispatch,
  loginData,
  balance,
  account,
  form = 'send-tokens',
}) => (
  <>
    <Modal
      show={showModal && showModal === form}
      closeModal={hideSendTokensModalDispatch}
      children={
        <SendTokensForm
          locale={locale}
          sendTokens={sendTokensDispatch}
          sendTokensProcessing={sendTokensProcessing}
          loginData={loginData}
          valueHasToBeLessThan={balance}
          account={account}
        />
      }
    />

    <Button onClick={() => showSendTokensModalDispatch(form)}>
      {children}
    </Button>
  </>
);

SendTokens.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.any,
  showModal: PropTypes.bool,
  sendTokensProcessing: PropTypes.bool,
  hideSendTokensModalDispatch: PropTypes.func,
  showSendTokensModalDispatch: PropTypes.func,
  sendTokensDispatch: PropTypes.func,
  loginData: PropTypes.object,
  balance: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  balance: makeSelectBalance(),
  showModal: selectors.selectShowModal(),
  sendTokensProcessing: selectors.selectSendTokensProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    hideSendTokensModalDispatch: bindActionCreators(
      hideSendTokensModal,
      dispatch,
    ),
    showSendTokensModalDispatch: bindActionCreators(
      showSendTokensModal,
      dispatch,
    ),
    sendTokensDispatch: bindActionCreators(sendTokens, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sendTokens', reducer });
const withSaga = injectSaga({ key: 'sendTokens', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SendTokens);
