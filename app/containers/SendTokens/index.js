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
import { selectEos } from '../EosioProvider/selectors';

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
  eosService,
}) => (
  <>
    <Modal show={showModal} closeModal={hideSendTokensModalDispatch}>
      <SendTokensForm
        locale={locale}
        sendTokens={sendTokensDispatch}
        sendTokensProcessing={sendTokensProcessing}
        loginData={loginData}
        valueHasToBeLessThan={balance}
        eosService={eosService}
      />
    </Modal>

    <Button onClick={showSendTokensModalDispatch}>{children}</Button>
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
  eosService: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'sendTokens', reducer }),
  injectSaga({ key: 'sendTokens', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      eosService: selectEos,
      locale: makeSelectLocale(),
      loginData: makeSelectLoginData(),
      balance: makeSelectBalance(),
      showModal: selectors.selectShowModal(),
      sendTokensProcessing: selectors.selectSendTokensProcessing(),
    }),
    dispatch => ({
      hideSendTokensModalDispatch: bindActionCreators(
        hideSendTokensModal,
        dispatch,
      ),
      showSendTokensModalDispatch: bindActionCreators(
        showSendTokensModal,
        dispatch,
      ),
      sendTokensDispatch: bindActionCreators(sendTokens, dispatch),
    }),
  ),
)(SendTokens);
