/**
 *
 * Toast
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

import { removeToast } from './actions';
import { TOP_RIGHT } from './constants';
import { makeSelectToasts } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Toasts from './Toasts';

/* eslint-disable react/prefer-stateless-function */
export class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.location = TOP_RIGHT;
  }

  removeToast = (e) => {
    this.props.removeToastDispatch(e.currentTarget.dataset.key);
  };

  render() /* istanbul ignore next */ {
    const sendProps = {
      toasts: this.props.toasts,
      removeToast: this.removeToast,
      location: this.location,
    };
    return <Toasts {...sendProps} />;
  }
}

Toast.propTypes = {
  toasts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  removeToastDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToasts(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    removeToastDispatch: bindActionCreators(removeToast, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'toast', reducer });
const withSaga = injectSaga({ key: 'toast', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(Toast);
