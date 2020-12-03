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

import { generateKeys } from 'utils/web_integration/src/util/eos-keygen';
import { generateMasterKey } from 'utils/web_integration/src/util/masterKeygen';
import { DAEMON } from 'utils/constants';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import Seo from 'components/Seo';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import * as signUpSelectors from './selectors';

import {
  checkEmail,
  verifyEmail,
  iHaveEosAccount,
  idontHaveEosAccount,
  putKeysToState,
  showScatterSignUpForm,
  signUpWithScatter,
  signUpWithKeycat,
  showKeycatSignUpForm,
  sendAnotherCode,
} from './actions';

import { EMAIL_FIELD } from './constants';

import messages from './messages';

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
  signUpWithScatterDispatch,
  signUpWithKeycatDispatch,
  keys,
  signUpWithScatterProcessing,
  signUpWithKeycatProcessing,
  showScatterSignUpProcessing,
  showKeycatSignUpProcessing,
  showScatterSignUpFormDispatch,
  putKeysToStateDispatch,
  showKeycatSignUpFormDispatch,
  account,
  withScatter,
  checkEmailDispatch,
  eosAccountName,
  keycatAccountName,
  sendAnotherCodeDispatch,
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
    if (!email && !withScatter && process.env.NODE_ENV !== 'development') {
      createdHistory.push(routes.signup.email.name);
    }

    if (!keys) {
      getMasterKey();
      getAllKeys();
    }
  }, []);

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
        showScatterSignUpForm: showScatterSignUpFormDispatch,
        signUpWithScatter: signUpWithScatterDispatch,
        signUpWithKeycat: signUpWithKeycatDispatch,
        sendAnotherCode: sendAnotherCodeDispatch,
        showKeycatSignUpForm: showKeycatSignUpFormDispatch,
        keys: keys || {},
        locale,
        account,
        eosAccountName,
        keycatAccountName,
        email,
        emailChecking,
        emailVerificationProcessing,
        iHaveEosAccountProcessing,
        idontHaveEosAccountProcessing,
        signUpWithScatterProcessing,
        signUpWithKeycatProcessing,
        showScatterSignUpProcessing,
        showKeycatSignUpProcessing,
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
  signUpWithScatterDispatch: PropTypes.func,
  signUpWithKeycatDispatch: PropTypes.func,
  emailChecking: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  iHaveEosAccountProcessing: PropTypes.bool,
  idontHaveEosAccountProcessing: PropTypes.bool,
  signUpWithScatterProcessing: PropTypes.bool,
  signUpWithKeycatProcessing: PropTypes.bool,
  showScatterSignUpProcessing: PropTypes.bool,
  showKeycatSignUpProcessing: PropTypes.bool,
  showScatterSignUpFormDispatch: PropTypes.func,
  account: PropTypes.string,
  email: PropTypes.string,
  eosAccountName: PropTypes.string,
  keycatAccountName: PropTypes.string,
  withScatter: PropTypes.bool,
  keys: PropTypes.object,
  putKeysToStateDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
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
    signUpWithScatterProcessing: signUpSelectors.selectSignUpWithScatterProcessing(),
    signUpWithKeycatProcessing: signUpSelectors.selectSignUpWithKeycatProcessing(),
    showScatterSignUpProcessing: signUpSelectors.selectShowScatterSignUpProcessing(),
    showKeycatSignUpProcessing: signUpSelectors.selectShowKeycatSignUpProcessing(),
    eosAccountName: signUpSelectors.selectEosAccountName(),
    keycatAccountName: signUpSelectors.selectKeycatAccountName(),
    keys: signUpSelectors.selectKeys(),
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
    showScatterSignUpFormDispatch: bindActionCreators(
      showScatterSignUpForm,
      dispatch,
    ),
    signUpWithScatterDispatch: bindActionCreators(signUpWithScatter, dispatch),
    signUpWithKeycatDispatch: bindActionCreators(signUpWithKeycat, dispatch),
    showKeycatSignUpFormDispatch: bindActionCreators(
      showKeycatSignUpForm,
      dispatch,
    ),
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUp);
