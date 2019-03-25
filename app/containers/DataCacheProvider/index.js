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
import reducer from './reducer';
import saga from './saga';

import { getCommunitiesWithTags } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class DataCacheProvider extends React.Component {
  componentDidMount() {
    this.props.getCommunitiesWithTagsDispatch();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

DataCacheProvider.propTypes = {
  getCommunitiesWithTagsDispatch: PropTypes.func,
  children: PropTypes.element,
};

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCommunitiesWithTagsDispatch: () => dispatch(getCommunitiesWithTags()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dataCacheProvider', reducer });
const withSaga = injectSaga({ key: 'dataCacheProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DataCacheProvider);
