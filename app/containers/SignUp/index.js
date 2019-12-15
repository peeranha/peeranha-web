/**
 *
 * SignUp
 *
 */

import React from 'react';
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
  sendAnotherCode,
} from './actions';

import { EMAIL_FIELD } from './constants';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  componentWillMount() {
    if (
      !this.props.email &&
      !this.props.withScatter &&
      process.env.NODE_ENV !== 'development'
    ) {
      createdHistory.push(routes.signup.email.name);
    }

    if (!this.props.keys) {
      this.getMasterKey();
      this.getAllKeys();
    }
  }

  checkEmail = values => {
    const email = values.get ? values.get(EMAIL_FIELD) : this.props.email;
    this.props.checkEmailDispatch(email);
  };

  getMasterKey = () => {
    const masterKey = generateMasterKey();
    const linkToDownloadMasterKey = this.getLinkToDownloadKeys(
      `Peeranha Master Key: ${masterKey}`,
    );

    this.props.putKeysToStateDispatch({
      masterKey,
      linkToDownloadMasterKey,
    });
  };

  getAllKeys = async () => {
    const { activeKey, ownerKey } = await generateKeys();

    this.props.putKeysToStateDispatch({
      activeKey,
      ownerKey,
    });
  };

  getLinkToDownloadKeys = keys => {
    const data = new Blob([keys], { type: 'text/plain' });
    return window.URL.createObjectURL(data);
  };

  render() /* istanbul ignore next */ {
    const {
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
      keys,
      signUpWithScatterProcessing,
      showScatterSignUpProcessing,
      showScatterSignUpFormDispatch,
      account,
      eosAccountName,
      sendAnotherCodeDispatch,
    } = this.props;

    return (
      <React.Fragment>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />

        {children({
          checkEmail: this.checkEmail,
          verifyEmail: verifyEmailDispatch,
          iHaveEosAccount: iHaveEosAccountDispatch,
          idontHaveEosAccount: idontHaveEosAccountDispatch,
          showLoginModal: showLoginModalDispatch,
          showScatterSignUpForm: showScatterSignUpFormDispatch,
          signUpWithScatter: signUpWithScatterDispatch,
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
          signUpWithScatterProcessing,
          showScatterSignUpProcessing,
        })}
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.any,
  showLoginModalDispatch: PropTypes.func,
  checkEmailDispatch: PropTypes.func,
  verifyEmailDispatch: PropTypes.func,
  iHaveEosAccountDispatch: PropTypes.func,
  idontHaveEosAccountDispatch: PropTypes.func,
  signUpWithScatterDispatch: PropTypes.func,
  emailChecking: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  iHaveEosAccountProcessing: PropTypes.bool,
  idontHaveEosAccountProcessing: PropTypes.bool,
  signUpWithScatterProcessing: PropTypes.bool,
  showScatterSignUpProcessing: PropTypes.bool,
  showScatterSignUpFormDispatch: PropTypes.func,
  account: PropTypes.string,
  email: PropTypes.string,
  eosAccountName: PropTypes.string,
  withScatter: PropTypes.bool,
  keys: PropTypes.object,
  putKeysToStateDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  email: signUpSelectors.selectEmail(),
  emailChecking: signUpSelectors.selectEmailChecking(),
  emailVerificationProcessing: signUpSelectors.selectEmailVerificationProcessing(),
  iHaveEosAccountProcessing: signUpSelectors.selectIHaveEosAccountProcessing(),
  idontHaveEosAccountProcessing: signUpSelectors.selectIdontHaveEosAccountProcessing(),
  signUpWithScatterProcessing: signUpSelectors.selectSignUpWithScatterProcessing(),
  showScatterSignUpProcessing: signUpSelectors.selectShowScatterSignUpProcessing(),
  eosAccountName: signUpSelectors.selectEosAccountName(),
  keys: signUpSelectors.selectKeys(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
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
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUp);
