/* eslint react/no-children-prop: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import _get from 'lodash/get';

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
import { selectUsers } from '../DataCacheProvider/selectors';

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
  cryptoAccounts,
}) => (
  <>
    <Modal
      show={showModal && showModal === form}
      closeModal={hideSendTokensModalDispatch}
    >
      <SendTokensForm
        locale={locale}
        sendTokens={sendTokensDispatch}
        sendTokensProcessing={sendTokensProcessing}
        loginData={loginData}
        valueHasToBeLessThan={balance}
        account={account}
        cryptoAccounts={cryptoAccounts}
        isSendTokens={form === 'send-tokens'}
      />
    </Modal>

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
  cryptoAccounts: PropTypes.object,
};

const withReducer = injectReducer({ key: 'sendTokens', reducer });
const withSaga = injectSaga({ key: 'sendTokens', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  connect(
    (state, { account }) => {
      const profile = selectUsers(account)(state);

      return {
        cryptoAccounts: _get(profile, ['profile', 'cryptoAccounts'], {}),
        locale: makeSelectLocale()(state),
        loginData: makeSelectLoginData()(state),
        balance: makeSelectBalance()(state),
        showModal: selectors.selectShowModal()(state),
        sendTokensProcessing: selectors.selectSendTokensProcessing()(state),
      };
    },
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
