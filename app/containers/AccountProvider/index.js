import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { getCookie } from 'utils/cookie';
import { onFacebookSdkInit } from 'utils/facebook';
import {
  AUTOLOGIN_DATA,
  FACEBOOK_AUTOLOGIN_ERROR,
} from 'containers/Login/constants';
import loginMessages from 'containers/Login/messages';
import {
  addFacebookError,
  autoLoginWithFacebook,
} from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import reducer from './reducer';
import saga from './saga';
import { getCurrentAccount } from './actions';
import { selectLastUpdate } from './selectors';
import { UPDATE_ACC_PERIOD } from './constants';

export const AccountProvider = ({
  children,
  lastUpdate,
  getCurrentAccountDispatch,
  autoLoginWithFacebookDispatch,
  addFacebookErrorDispatch,
  locale,
}) => {
  useEffect(() => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (autoLoginData?.loginWithFacebook) {
      // account initializing with facebook sdk

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

    setInterval(() => {
      const diff = Date.now() - lastUpdate;

      if (diff > UPDATE_ACC_PERIOD) {
        getCurrentAccountDispatch();
      }
    }, UPDATE_ACC_PERIOD / 5);
  }, []);

  return children;
};

AccountProvider.propTypes = {
  getCurrentAccountDispatch: PropTypes.func,
  autoLoginWithFacebookDispatch: PropTypes.func,
  addFacebookErrorDispatch: PropTypes.func,
  children: PropTypes.object,
  lastUpdate: PropTypes.number,
  locale: PropTypes.string,
};

export default compose(
  injectReducer({ key: 'accountProvider', reducer }),
  injectSaga({ key: 'accountProvider', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      lastUpdate: selectLastUpdate(),
      locale: makeSelectLocale(),
    }),
    dispatch => ({
      getCurrentAccountDispatch: bindActionCreators(
        getCurrentAccount,
        dispatch,
      ),
      autoLoginWithFacebookDispatch: bindActionCreators(
        autoLoginWithFacebook,
        dispatch,
      ),
      addFacebookErrorDispatch: bindActionCreators(addFacebookError, dispatch),
    }),
  ),
)(AccountProvider);
