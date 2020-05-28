/**
 *
 * DataCacheProvider
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import reducer from './reducer';
import saga from './saga';

import { getStat, getFaq } from './actions';

export const DataCacheProvider = ({
  children,
  getStatDispatch,
  getFaqDispatch,
}) => {
  useEffect(() => {
    getStatDispatch();
    getFaqDispatch();
  });

  return children;
};

DataCacheProvider.propTypes = {
  getStatDispatch: PropTypes.func,
  getFaqDispatch: PropTypes.func,
  children: PropTypes.element,
};

const withConnect = connect(
  null,
  dispatch => ({
    getStatDispatch: bindActionCreators(getStat, dispatch),
    getFaqDispatch: bindActionCreators(getFaq, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'dataCacheProvider', reducer });
const withSaga = injectSaga({ key: 'dataCacheProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DataCacheProvider);
