/**
 *
 * AccountProvider
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
export class AccountProvider extends React.Component {
  componentDidMount() {
    this.props.getCurrentAccountDispatch();
  }

  render() /* istanbul ignore next */ {
    return [React.Children.toArray(this.props.children)];
  }
}

AccountProvider.propTypes = {
  getCurrentAccountDispatch: PropTypes.func,
  children: PropTypes.array,
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

const withReducer = injectReducer({ key: 'accountProvider', reducer });
const withSaga = injectSaga({ key: 'accountProvider', saga });

export { mapDispatchToProps };

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountProvider);
