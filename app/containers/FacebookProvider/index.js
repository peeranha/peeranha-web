import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import { getCookie } from 'utils/cookie';
import { onFacebookSdkInit } from 'utils/facebook';

import {
  AUTOLOGIN_DATA,
  FACEBOOK_AUTOLOGIN_ERROR,
} from 'containers/Login/constants';
import loginMessages from 'containers/Login/messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  addFacebookError,
  autoLoginWithFacebook,
} from 'containers/Login/actions';
import { getCurrentAccount } from 'containers/AccountProvider/actions';

const FacebookProvider = ({
  children,
  locale,
  autoLoginWithFacebookDispatch,
  addFacebookErrorDispatch,
  getCurrentAccountDispatch,
}) => {
  // the main facebook sdk initializing is performed with react-facebook-login package

  // this component provides facebook sdk init for auto login with facebook
  useEffect(() => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (autoLoginData?.loginWithFacebook) {
      const translations = translationMessages[locale];
      const fbConnectErrMsg =
        translations[loginMessages[FACEBOOK_AUTOLOGIN_ERROR].id];
      onFacebookSdkInit(
        autoLoginWithFacebookDispatch,
        getCurrentAccountDispatch,
        addFacebookErrorDispatch,
        fbConnectErrMsg,
      );
    } else {
      getCurrentAccountDispatch();
    }
  }, []);

  return <React.Fragment> {children}</React.Fragment>;
};

FacebookProvider.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.element,
  autoLoginWithFacebookDispatch: PropTypes.func,
  addFacebookErrorDispatch: PropTypes.func,
  getCurrentAccountDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
  dispatch => ({
    autoLoginWithFacebookDispatch: bindActionCreators(
      autoLoginWithFacebook,
      dispatch,
    ),
    addFacebookErrorDispatch: bindActionCreators(addFacebookError, dispatch),
    getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
  }),
)(FacebookProvider);
