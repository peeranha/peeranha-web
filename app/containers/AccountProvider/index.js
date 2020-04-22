/**
 *
 * AccountProvider
 *
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import reducer from './reducer';
import saga from './saga';
import { getCurrentAccount } from './actions';
import { selectLastUpdate } from './selectors';
import { UPDATE_ACC_PERIOD } from './constants';

export const AccountProvider = ({
  children,
  lastUpdate,
  getCurrentAccountDispatch,
}) => {
  useEffect(() => {
    getCurrentAccountDispatch();
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
  children: PropTypes.object,
  lastUpdate: PropTypes.number,
};

const withConnect = connect(
  createStructuredSelector({
    lastUpdate: selectLastUpdate(),
  }),
  dispatch => ({
    getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'accountProvider', reducer });
const withSaga = injectSaga({ key: 'accountProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountProvider);
