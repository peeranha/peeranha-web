/**
 *
 * Logout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import reducer from './reducer';
import saga from './saga';

import { logout } from './actions';

export const Logout = /* istanbul ignore next */ ({
  logoutDispatch,
  children,
}) => (
  <button className="d-flex align-items-center" onClick={logoutDispatch}>
    {children}
  </button>
);

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
