import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import { getCookie } from 'utils/cookie';
import { onFacebookSdkInit } from 'utils/facebook';
import {
  addFacebookError,
  autoLoginWithFacebook,
} from 'containers/Login/actions';
import { getCurrentAccount } from 'containers/AccountProvider/actions';
import {
  AUTOLOGIN_DATA,
  FACEBOOK_AUTOLOGIN_ERROR,
} from 'containers/Login/constants';
import loginMessages from 'containers/Login/messages';

import { makeSelectLocale } from './selectors';
import { changeLocale } from './actions';
import { APP_LOCALE } from './constants';

export const LanguageProvider = ({
  children,
  locale,
  messages,
  changeLocaleDispatch,
  autoLoginWithFacebookDispatch,
  addFacebookErrorDispatch,
  getCurrentAccountDispatch,
}) => {
  let сurrentLocale = locale;

  useEffect(() => {
    const projectLangs = Object.keys(translationMessages);
    const storedLocale = getCookie(APP_LOCALE);

    if (storedLocale) {
      changeLocaleDispatch(storedLocale);
      сurrentLocale = storedLocale;
    } else {
      // find the first suitable language in window.navigator.languages
      const userLocale = window.navigator.languages
        .find(lang => projectLangs.includes(lang.slice(0, 2)))
        ?.slice(0, 2);

      if (userLocale) {
        changeLocaleDispatch(userLocale);
        сurrentLocale = userLocale;
      }
    }
  }, []);

  useEffect(() => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (autoLoginData?.loginWithFacebook) {
      // account initializing with facebook sdk

      const translations = translationMessages[сurrentLocale];
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

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element,
  changeLocaleDispatch: PropTypes.func,
  autoLoginWithFacebookDispatch: PropTypes.func,
  addFacebookErrorDispatch: PropTypes.func,
  getCurrentAccountDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
  dispatch => ({
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
    autoLoginWithFacebookDispatch: bindActionCreators(
      autoLoginWithFacebook,
      dispatch,
    ),
    addFacebookErrorDispatch: bindActionCreators(addFacebookError, dispatch),
    getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
  }),
)(LanguageProvider);
