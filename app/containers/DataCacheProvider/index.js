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

import {
  getStat,
  getFaq,
  getTutorial,
  getCommunitiesWithTags,
} from './actions';

export const DataCacheProvider = ({
  children,
  getCommunitiesWithTagsDispatch,
  getFaqDispatch,
  getTutorialDispatch,
}) => {
  useEffect(() => {
    getCommunitiesWithTagsDispatch();
    getFaqDispatch();
    getTutorialDispatch();
  });

  return children;
};

DataCacheProvider.propTypes = {
  getCommunitiesWithTagsDispatch: PropTypes.func,
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
    getFaqDispatch: bindActionCreators(getFaq, dispatch),
    getTutorialDispatch: bindActionCreators(getTutorial, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'dataCacheProvider', reducer });
const withSaga = injectSaga({ key: 'dataCacheProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DataCacheProvider);
