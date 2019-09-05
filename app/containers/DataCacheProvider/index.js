/**
 *
 * DataCacheProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
    getCommunitiesWithTagsDispatch: () => dispatch(getCommunitiesWithTags()),
    getStatDispatch: () => dispatch(getStat()),
    getFaqDispatch: () => dispatch(getFaq()),
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
