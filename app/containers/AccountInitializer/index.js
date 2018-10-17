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

import { getCurrentAccount } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AccountInitializer extends React.Component {
  componentDidUpdate = async () => {
    this.props.getCurrentAccountDispatch();
  };

  render() {
    return [React.Children.only(this.props.children)];
  }
}

AccountInitializer.propTypes = {
  getCurrentAccountDispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCurrentAccountDispatch: () => dispatch(getCurrentAccount()),
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
