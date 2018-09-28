/**
 *
 * AccountInitializer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { reviewAccount } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AccountInitializer extends React.Component {
  static componentDidMount() {
    return this.props.reviewAccountDispatch();
  }

  render() {
    return [React.Children.only(this.props.children)];
  }
}

AccountInitializer.propTypes = {
  reviewAccountDispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reviewAccountDispatch: () => dispatch(reviewAccount()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'accountInitializer', reducer });
const withSaga = injectSaga({ key: 'accountInitializer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountInitializer);
