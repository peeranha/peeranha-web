/**
 *
 * AccountProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { getCurrentAccount } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AccountProvider extends React.Component {
  componentDidMount() {
    this.props.getCurrentAccountDispatch();
  }

  render() /* istanbul ignore next */ {
    return this.props.children;
  }
}

AccountProvider.propTypes = {
  getCurrentAccountDispatch: PropTypes.func,
  children: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'accountProvider', reducer });
const withSaga = injectSaga({ key: 'accountProvider', saga, mode: DAEMON });

export { mapDispatchToProps };

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountProvider);
