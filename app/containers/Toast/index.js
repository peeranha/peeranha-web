/**
 *
 * Toast
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { removeToast } from './actions';
import { BOTTOM_RIGHT } from './constants';
import { makeSelectToasts } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Toasts from './Toasts';

/* eslint-disable react/prefer-stateless-function */
export class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.location = BOTTOM_RIGHT;
  }

  removeToast = e => this.props.removeToastDispatch(e.target.dataset.key);

  render() {
    const sendProps = {
      toasts: this.props.toasts,
      removeToast: this.removeToast,
      location: this.location,
    };
    return [
      this.props.toasts.length ? <Toasts key="toasts" {...sendProps} /> : null,
    ];
  }
}

Toast.propTypes = {
  toasts: PropTypes.object,
  removeToastDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToasts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    removeToastDispatch: key => dispatch(removeToast(key)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'toast', reducer });
const withSaga = injectSaga({ key: 'toast', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Toast);
