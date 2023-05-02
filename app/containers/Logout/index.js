/**
 *
 * Logout
 *
 */

import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { deleteCookie } from 'utils/cookie';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import { isSuiBlockchain } from 'utils/sui/sui';

import reducer from './reducer';
import saga from './saga';

import { logout } from './actions';

export const Logout = /* istanbul ignore next */ ({ logoutDispatch, children }) => {
  const wallet = useWallet();
  const suiLogout = () => {
    wallet.disconnect().then((r) => {
      logoutDispatch();
      deleteCookie('connectedWallet');
    });
  };
  const logout = isSuiBlockchain ? suiLogout : logoutDispatch;
  return (
    <button className="d-flex align-items-center" onClick={logout}>
      {children}
    </button>
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

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'logout', reducer });
const withSaga = injectSaga({ key: 'logout', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Logout);
