import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import { getCookie } from 'utils/cookie';
import { onFacebookSdkInit } from 'utils/facebook';

import { AUTOLOGIN_DATA } from 'containers/Login/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  autoLoginWithFacebook,
  handleFbLoginError,
} from 'containers/Login/actions';
import { getCurrentAccount } from 'containers/AccountProvider/actions';

const FacebookProvider = ({
  children,
  autoLoginWithFacebookDispatch,
  handleFbLoginErrorDispatch,
  getCurrentAccountDispatch,
}) => {
  // this component provides facebook sdk init for auto login with facebook
  useEffect(() => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (autoLoginData?.loginWithFacebook) {
      const onErrorCallBack = () => handleFbLoginErrorDispatch(true);

      onFacebookSdkInit(autoLoginWithFacebookDispatch, onErrorCallBack);
    } else {
      getCurrentAccountDispatch();
    }
  }, []);

  return <> {children}</>;
};

FacebookProvider.propTypes = {
  children: PropTypes.element,
  autoLoginWithFacebookDispatch: PropTypes.func,
  handleFbLoginErrorDispatch: PropTypes.func,
  getCurrentAccountDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
  (dispatch) => ({
    autoLoginWithFacebookDispatch: bindActionCreators(
      autoLoginWithFacebook,
      dispatch,
    ),
    handleFbLoginErrorDispatch: bindActionCreators(
      handleFbLoginError,
      dispatch,
    ),
    getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
  }),
)(FacebookProvider);
