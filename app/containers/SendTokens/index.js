import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Modal from 'components/ModalDialog';
import FbVerificationCodeForm from 'components/FbVerificationCodeForm/index';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectLoginData,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  hideSendTokensModal,
  showSendTokensModal,
  sendTokens,
  verifyFbAction,
  sendAnotherCode,
  sendFbVerificationEmail,
} from './actions';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import Button from './StyledButton';
import SendTokensForm from './SendTokensForm';
import { selectEos } from '../EosioProvider/selectors';
import { getAvailableBalance } from '../../utils/profileManagement';

export const SendTokens = /* istanbul ignore next */ ({
  locale,
  sendTokensDispatch,
  sendTokensProcessing,
  sendFbVerificationEmailDispatch,
  children,
  showModal,
  isVerifyFbModal,
  hideSendTokensModalDispatch,
  showSendTokensModalDispatch,
  verifyFbActionDispatch,
  sendAnotherCodeDispatch,
  loginData,
  profileInfo,
  eosService,
}) => {
  const availableBalance = getAvailableBalance(profileInfo);

  return (
    <>
      <Modal show={showModal} closeModal={hideSendTokensModalDispatch}>
        {!isVerifyFbModal && (
          <SendTokensForm
            locale={locale}
            sendTokens={sendTokensDispatch}
            sendFbVerificationEmail={sendFbVerificationEmailDispatch}
            sendTokensProcessing={sendTokensProcessing}
            loginData={loginData}
            valueHasToBeLessThan={availableBalance}
            eosService={eosService}
          />
        )}
        {isVerifyFbModal && (
          <FbVerificationCodeForm
            locale={locale}
            verifyEmail={verifyFbActionDispatch}
            verifyEmailLoading={sendTokensProcessing}
            sendAnotherCode={sendAnotherCodeDispatch}
          />
        )}
      </Modal>

      <Button onClick={showSendTokensModalDispatch}>{children}</Button>
    </>
  );
};

SendTokens.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.any,
  showModal: PropTypes.bool,
  isVerifyFbModal: PropTypes.bool,
  sendTokensProcessing: PropTypes.bool,
  hideSendTokensModalDispatch: PropTypes.func,
  showSendTokensModalDispatch: PropTypes.func,
  verifyFbActionDispatch: PropTypes.func,
  sendFbVerificationEmailDispatch: PropTypes.func,
  sendTokensDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
  loginData: PropTypes.object,
  eosService: PropTypes.object,
  profileInfo: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'sendTokens', reducer }),
  injectSaga({ key: 'sendTokens', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      eosService: selectEos,
      locale: makeSelectLocale(),
      loginData: makeSelectLoginData(),
      profileInfo: makeSelectProfileInfo(),
      showModal: selectors.selectShowModal(),
      isVerifyFbModal: selectors.selectVerifyFbModal(),
      sendTokensProcessing: selectors.selectSendTokensProcessing(),
    }),
    (dispatch) => ({
      hideSendTokensModalDispatch: bindActionCreators(
        hideSendTokensModal,
        dispatch,
      ),
      showSendTokensModalDispatch: bindActionCreators(
        showSendTokensModal,
        dispatch,
      ),
      sendTokensDispatch: bindActionCreators(sendTokens, dispatch),
      sendFbVerificationEmailDispatch: bindActionCreators(
        sendFbVerificationEmail,
        dispatch,
      ),
      sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
      verifyFbActionDispatch: bindActionCreators(verifyFbAction, dispatch),
    }),
  ),
)(SendTokens);
