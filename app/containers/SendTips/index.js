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
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  hideSendTipsModal,
  showSendTipsModal,
  sendTips,
  sendFbVerificationEmail,
  sendAnotherCode,
  verifyFbAction,
} from './actions';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import Button from '../SendTokens/StyledButton';
import SendTipsForm from './SendTipsForm';
import { selectUsers } from '../DataCacheProvider/selectors';
import { getAvailableBalance } from '../../utils/profileManagement';
import VerificationCodeForm from './VerificationCodeForm';

export const SendTips = ({
  locale,
  sendTipsDispatch,
  sendTipsProcessing,
  children,
  showModal,
  hideSendTipsModalDispatch,
  showSendTipsModalDispatch,
  sendFbVerificationEmailDispatch,
  sendAnotherCodeDispatch,
  verifyFbActionDispatch,
  loginData,
  profileInfo,
  account,
  form = 'send-Tips',
  cryptoAccounts,
  whoWillBeTipped,
  communityId,
  questionId,
  answerId,
  isVerifyFbModal,
}) => {
  const availableBalance = getAvailableBalance(profileInfo);

  return (
    <>
      <Modal
        show={!!showModal && showModal === form && account === whoWillBeTipped}
        closeModal={hideSendTipsModalDispatch}
      >
        {!isVerifyFbModal && (
          <SendTipsForm
            locale={locale}
            sendTips={(...args) =>
              sendTipsDispatch(...args, communityId, questionId, answerId)
            }
            sendFbVerificationEmail={(...args) =>
              sendFbVerificationEmailDispatch(
                ...args,
                communityId,
                questionId,
                answerId,
              )
            }
            sendTipsProcessing={sendTipsProcessing}
            loginData={loginData}
            valueHasToBeLessThan={availableBalance}
            account={account}
            cryptoAccounts={cryptoAccounts}
          />
        )}
        {isVerifyFbModal && (
          <VerificationCodeForm
            locale={locale}
            verifyEmail={verifyFbActionDispatch}
            verifyEmailLoading={sendTipsProcessing}
            sendAnotherCode={sendAnotherCodeDispatch}
          />
        )}
      </Modal>

      <Button onClick={() => showSendTipsModalDispatch(form, account)}>
        {children}
      </Button>
    </>
  );
};

SendTips.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.any,
  showModal: PropTypes.string,
  whoWillBeTipped: PropTypes.string,
  sendTipsProcessing: PropTypes.bool,
  hideSendTipsModalDispatch: PropTypes.func,
  showSendTipsModalDispatch: PropTypes.func,
  sendFbVerificationEmailDispatch: PropTypes.func,
  sendTipsDispatch: PropTypes.func,
  loginData: PropTypes.object,
  balance: PropTypes.number,
  cryptoAccounts: PropTypes.object,
  communityId: PropTypes.number,
  questionId: PropTypes.string,
  answerId: PropTypes.number,
  isVerifyFbModal: PropTypes.bool,
  sendAnotherCodeDispatch: PropTypes.func,
  verifyFbActionDispatch: PropTypes.func,
};

const withReducer = injectReducer({ key: 'sendTips', reducer });
const withSaga = injectSaga({ key: 'sendTips', saga, mode: DAEMON });

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
        profileInfo: makeSelectProfileInfo()(state),
        showModal: selectors.selectShowModal()(state),
        whoWillBeTipped: selectors.selectWhoWillBeTipped()(state),
        sendTipsProcessing: selectors.selectSendTipsProcessing()(state),
        isVerifyFbModal: selectors.selectIsVerifyFbModal()(state),
      };
    },
    dispatch => ({
      hideSendTipsModalDispatch: bindActionCreators(
        hideSendTipsModal,
        dispatch,
      ),
      showSendTipsModalDispatch: bindActionCreators(
        showSendTipsModal,
        dispatch,
      ),
      sendTipsDispatch: bindActionCreators(sendTips, dispatch),
      sendFbVerificationEmailDispatch: bindActionCreators(
        sendFbVerificationEmail,
        dispatch,
      ),
      sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
      verifyFbActionDispatch: bindActionCreators(verifyFbAction, dispatch),
    }),
  ),
)(SendTips);
