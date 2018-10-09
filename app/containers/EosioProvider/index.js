/**
 *
 * EosioProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { initEosio } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectInitializing,
  makeSelectEos,
  makeSelectError,
} from './selectors';

export class EosioProvider extends React.Component {
  componentDidMount() {
    this.props.initEosio();
  }

  render() {
    return [React.Children.only(this.props.children)];
  }
}

EosioProvider.propTypes = {
  initializing: PropTypes.bool,
  eos: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  initEosio: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  initializing: makeSelectInitializing(),
  eos: makeSelectEos(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    initEosio: () => dispatch(initEosio()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'eosioProvider', reducer });
const withSaga = injectSaga({ key: 'eosioProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EosioProvider);
