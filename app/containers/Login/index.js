import CodeWasSent from 'containers/Login/CodeWasSent';
import VerificationForm from 'containers/Login/VerificationForm/VerificationForm';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import ModalDialog from 'components/ModalDialog';

import notificationsReducer from 'components/Notifications/reducer';
import EmailForm from 'containers/Login/SignIn/EmailForm';

import * as selectors from './selectors';

import {
  hideSignInModal,
  loginWithSui,
  loginWithWallet,
  signInWithEmail,
  startVerifying,
  verifyEmail,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import { selectEthereum } from '../EthereumProvider/selectors';

export const Login = ({
  showEmailPasswordFormDispatch,
  loginWithSuiDispatch,
  showSignInModal,
  showSentCodeModal,
  showVerificationModal,
  signInWithEmailDispatch,
  startVerifyingDispatch,
  verifyEmailDispatch,
  hideSignInModalDispatch,
}) => {
  const [email, setEmail] = useState('');
  const [isWalletLogin, setIsWalletLogin] = useState(false);

  useEffect(() => {
    if (isWalletLogin) {
      hideSignInModalDispatch();
      setIsWalletLogin(false);
    }
  }, [hideSignInModalDispatch, isWalletLogin]);

  return (
    <>
      <ModalDialog show={showSignInModal} closeModal={hideSignInModalDispatch}>
        {!showSentCodeModal && !showVerificationModal && (
          <EmailForm
            showEmailPasswordForm={showEmailPasswordFormDispatch}
            loginWithWallet={loginWithSuiDispatch}
            setIsWalletLogin={setIsWalletLogin}
            signInWithEmailDispatch={signInWithEmailDispatch}
            setEmail={setEmail}
          />
        )}

        {showSentCodeModal && <CodeWasSent startVerifying={startVerifyingDispatch} />}

        {showVerificationModal && (
          <VerificationForm
            email={email}
            verifyEmail={verifyEmailDispatch}
            signInWithEmail={signInWithEmailDispatch}
            hideModal={hideSignInModalDispatch}
          />
        )}
      </ModalDialog>
    </>
  );
};

const withConnect = connect(
  createStructuredSelector({
    content: selectors.makeSelectContent(),
    showSignInModal: selectors.makeSelectShowSignInModal(),
    showSentCodeModal: selectors.makeSelectSentCodeModal(),
    showVerificationModal: selectors.makeSelectShowVerificationModal(),
    email: selectors.makeSelectEmail(),
    ethereumService: selectEthereum,
  }),
  (dispatch) => ({
    hideSignInModalDispatch: bindActionCreators(hideSignInModal, dispatch),
    signInWithEmailDispatch: bindActionCreators(signInWithEmail, dispatch),
    loginWithEthereumDispatch: bindActionCreators(loginWithWallet, dispatch),
    loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
    startVerifyingDispatch: bindActionCreators(startVerifying, dispatch),
    verifyEmailDispatch: bindActionCreators(verifyEmail, dispatch),
  }),
);

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'login', saga, mode: DAEMON }),
  withConnect,
)(Login);
