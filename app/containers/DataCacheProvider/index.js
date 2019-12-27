/**
 *
 * DataCacheProvider
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

import { getCommunitiesWithTags, getStat, getFaq } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class DataCacheProvider extends React.Component {
  componentDidMount() {
    this.props.getStatDispatch();
    this.props.getFaqDispatch();
    this.props.getCommunitiesWithTagsDispatch();
  }

  render() {
    return this.props.children;
  }
}

DataCacheProvider.propTypes = {
  getCommunitiesWithTagsDispatch: PropTypes.func,
  getStatDispatch: PropTypes.func,
  getFaqDispatch: PropTypes.func,
  children: PropTypes.element,
};

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getCommunitiesWithTagsDispatch: bindActionCreators(
      getCommunitiesWithTags,
      dispatch,
    ),
    getStatDispatch: bindActionCreators(getStat, dispatch),
    getFaqDispatch: bindActionCreators(getFaq, dispatch),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dataCacheProvider', reducer });
const withSaga = injectSaga({ key: 'dataCacheProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DataCacheProvider);
