/**
 *
 * Logout
 *
 */

import { EMAIL_LOGIN_DATA } from 'containers/Login/constants';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { deleteCookie } from 'utils/cookie';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON, isSuiBlockchain } from 'utils/constants';

import reducer from './reducer';
import saga from './saga';

import { logout } from './actions';

export const Logout = /* istanbul ignore next */ ({ logoutDispatch, children, wallet }) => {
  const suiLogout = () => {
    if (!wallet.connected) {
      deleteCookie(EMAIL_LOGIN_DATA);
      logoutDispatch();
    } else {
      wallet.select(wallet.name).then(() =>
        wallet.disconnect().then(() => {
          logoutDispatch();
          deleteCookie('connectedWallet');
        }),
      );
    }
  };
  const logout = isSuiBlockchain ? suiLogout : logoutDispatch;

  return (
    <a className="d-flex align-items-center" onClick={logout}>
      {children}
    </a>
  );
};
Logout.propTypes = {
  logoutDispatch: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    logoutDispatch: bindActionCreators(logout, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({
  wallet: selectSuiWallet(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'logout', reducer });
const withSaga = injectSaga({ key: 'logout', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Logout);
