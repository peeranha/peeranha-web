import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { getCookie } from 'utils/cookie';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import { autoLoginWithFacebook } from 'containers/Login/actions';
import { onFacebookSdkInit } from 'utils/facebook';

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
}) => {
  useEffect(() => {
    const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

    if (autoLoginData?.loginWithFacebook) {
      // account initializing with facebook sdk
      onFacebookSdkInit(autoLoginWithFacebookDispatch);
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
  children: PropTypes.object,
  lastUpdate: PropTypes.number,
};

export default compose(
  injectReducer({ key: 'accountProvider', reducer }),
  injectSaga({ key: 'accountProvider', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      lastUpdate: selectLastUpdate(),
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
    }),
  ),
)(AccountProvider);
