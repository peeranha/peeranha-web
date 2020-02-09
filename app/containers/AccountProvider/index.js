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

import reducer from './reducer';
import saga from './saga';
import { getCurrentAccount } from './actions';
import { selectLastUpdate } from './selectors';
import { UPDATE_ACC_PERIOD } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class AccountProvider extends React.Component {
  componentDidMount() {
    this.props.getCurrentAccountDispatch();

    setInterval(() => {
      const diff = Date.now() - this.props.lastUpdate;

      if (diff > UPDATE_ACC_PERIOD) {
        this.props.getCurrentAccountDispatch();
      }
    }, UPDATE_ACC_PERIOD / 5);
  }

  render() /* istanbul ignore next */ {
    return this.props.children;
  }
}

AccountProvider.propTypes = {
  getCurrentAccountDispatch: PropTypes.func,
  children: PropTypes.array,
  lastUpdate: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  lastUpdate: selectLastUpdate(),
});

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
