/**
 *
 * SignUp
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { DAEMON } from 'utils/constants';
import { HOME_KEY } from 'containers/Home/constants';

import { generateKeys } from 'utils/web_integration/src/util/eos-keygen';
import { generateMasterKey } from 'utils/web_integration/src/util/masterKeygen';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { getLogo } from 'containers/Home/actions';
import { showLoginModal } from 'containers/Login/actions';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectLogo } from 'containers/Home/selectors';

import Seo from 'components/Seo';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import homeReducer from 'containers/Home/reducer';
import homeSaga from 'containers/Home/saga';

import reducer from './reducer';
import saga from './saga';

import * as signUpSelectors from './selectors';

import {
  checkEmail,
  verifyEmail,
  iHaveEosAccount,
  idontHaveEosAccount,
  putKeysToState,
  showWalletSignUpForm,
  signUpWithWallet,
  sendAnotherCode,
} from './actions';

import { EMAIL_FIELD } from './constants';

import messages from './messages';

const single = isSingleCommunityWebsite();

export const SignUp = ({
  locale,
  children,
  email,
  emailChecking,
  emailVerificationProcessing,
  iHaveEosAccountProcessing,
  idontHaveEosAccountProcessing,
  idontHaveEosAccountDispatch,
  iHaveEosAccountDispatch,
  verifyEmailDispatch,
  showLoginModalDispatch,
  signUpWithWalletDispatch,
  keys,
  signUpWithWalletProcessing,
  showWalletSignUpProcessing,
  showWalletSignUpFormDispatch,
  putKeysToStateDispatch,
  account,
  withWallet,
  checkEmailDispatch,
  eosAccountName,
  sendAnotherCodeDispatch,
  logo,
  getLogoDispatch,
}) => {
  const checkEmailMethod = values => {
    const post = values.get ? values.get(EMAIL_FIELD) : email;
    checkEmailDispatch(post);
  };

  const getLinkToDownloadKeys = k => {
    const data = new Blob([k], { type: 'text/plain' });
    return window.URL.createObjectURL(data);
  };

  const getMasterKey = () => {
    const masterKey = generateMasterKey();
    const linkToDownloadMasterKey = getLinkToDownloadKeys(
      `Peeranha Master Key: ${masterKey}`,
    );

    putKeysToStateDispatch({
      masterKey,
      linkToDownloadMasterKey,
    });
  };

  const getAllKeys = async () => {
    const { activeKey, ownerKey } = await generateKeys();

    putKeysToStateDispatch({
      activeKey,
      ownerKey,
    });
  };

  useEffect(() => {
    if (!email && !withWallet && process.env.NODE_ENV !== 'development') {
      createdHistory.push(routes.signup.email.name);
    }

    if (!keys) {
      getMasterKey();
      getAllKeys();
    }
  }, []);

  useEffect(
    () => {
      if (single) {
        getLogoDispatch();
      }
    },
    [single],
  );

  return (
    <>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      {children({
        checkEmail: checkEmailMethod,
        verifyEmail: verifyEmailDispatch,
        iHaveEosAccount: iHaveEosAccountDispatch,
        idontHaveEosAccount: idontHaveEosAccountDispatch,
        showLoginModal: showLoginModalDispatch,
        showWalletSignUpForm: showWalletSignUpFormDispatch,
        signUpWithWallet: signUpWithWalletDispatch,
        sendAnotherCode: sendAnotherCodeDispatch,
        keys: keys || {},
        locale,
        account,
        eosAccountName,
        email,
        emailChecking,
        emailVerificationProcessing,
        iHaveEosAccountProcessing,
        idontHaveEosAccountProcessing,
        signUpWithWalletProcessing,
        showWalletSignUpProcessing,
        logo,
      })}
    </>
  );
};

SignUp.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.any,
  showLoginModalDispatch: PropTypes.func,
  checkEmailDispatch: PropTypes.func,
  verifyEmailDispatch: PropTypes.func,
  iHaveEosAccountDispatch: PropTypes.func,
  idontHaveEosAccountDispatch: PropTypes.func,
  signUpWithWalletDispatch: PropTypes.func,
  emailChecking: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  iHaveEosAccountProcessing: PropTypes.bool,
  idontHaveEosAccountProcessing: PropTypes.bool,
  signUpWithWalletProcessing: PropTypes.bool,
  showWalletSignUpProcessing: PropTypes.bool,
  showWalletSignUpFormDispatch: PropTypes.func,
  account: PropTypes.string,
  email: PropTypes.string,
  eosAccountName: PropTypes.string,
  withWallet: PropTypes.bool,
  keys: PropTypes.object,
  putKeysToStateDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
  logo: PropTypes.string,
  getLogoDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    account: makeSelectAccount(),
    email: signUpSelectors.selectEmail(),
    emailChecking: signUpSelectors.selectEmailChecking(),
    emailVerificationProcessing: signUpSelectors.selectEmailVerificationProcessing(),
    iHaveEosAccountProcessing: signUpSelectors.selectIHaveEosAccountProcessing(),
    idontHaveEosAccountProcessing: signUpSelectors.selectIdontHaveEosAccountProcessing(),
    signUpWithWalletProcessing: signUpSelectors.selectSignUpWithWalletProcessing(),
    showWalletSignUpProcessing: signUpSelectors.selectShowWalletSignUpProcessing(),
    eosAccountName: signUpSelectors.selectEosAccountName(),
    keys: signUpSelectors.selectKeys(),
    logo: selectLogo(),
  }),
  dispatch => ({
    checkEmailDispatch: bindActionCreators(checkEmail, dispatch),
    verifyEmailDispatch: bindActionCreators(verifyEmail, dispatch),
    iHaveEosAccountDispatch: bindActionCreators(iHaveEosAccount, dispatch),
    idontHaveEosAccountDispatch: bindActionCreators(
      idontHaveEosAccount,
      dispatch,
    ),
    putKeysToStateDispatch: bindActionCreators(putKeysToState, dispatch),
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    showWalletSignUpFormDispatch: bindActionCreators(
      showWalletSignUpForm,
      dispatch,
    ),
    signUpWithWalletDispatch: bindActionCreators(signUpWithWallet, dispatch),
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    getLogoDispatch: bindActionCreators(getLogo, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga, mode: DAEMON });
const withHomePageReducer = injectReducer({ key: HOME_KEY, reducer: homeReducer, });
const withHomePageSaga = injectSaga({ key: HOME_KEY, saga: homeSaga });

export default compose(
  withReducer,
  withSaga,
  withHomePageReducer,
  withHomePageSaga,
  withConnect,
)(SignUp);
