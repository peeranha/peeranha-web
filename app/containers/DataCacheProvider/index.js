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

import { getCommunitiesWithTags, getStat, getFaq } from './actions';

export const DataCacheProvider = ({
  children,
  getStatDispatch,
  getFaqDispatch,
  getCommunitiesWithTagsDispatch,
}) => {
  useEffect(() => {
    getStatDispatch();
    getFaqDispatch();
    getCommunitiesWithTagsDispatch();
  });

  return children;
};

DataCacheProvider.propTypes = {
  getCommunitiesWithTagsDispatch: PropTypes.func,
  getStatDispatch: PropTypes.func,
  getFaqDispatch: PropTypes.func,
  children: PropTypes.element,
};

const withConnect = connect(
  null,
  dispatch => ({
    getCommunitiesWithTagsDispatch: bindActionCreators(
      getCommunitiesWithTags,
      dispatch,
    ),
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
