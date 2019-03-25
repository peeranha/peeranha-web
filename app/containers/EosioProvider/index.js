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
import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import { initEosio } from './actions';
import { makeSelectInitializing } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class EosioProvider extends React.Component {
  componentDidMount() {
    this.props.initEosio();
  }

  render() {
    return (
      <div>
        {this.props.initializing && <LoadingIndicator />}

        {!this.props.initializing && React.Children.only(this.props.children)}
      </div>
    );
  }
}

EosioProvider.propTypes = {
  initEosio: PropTypes.func,
  children: PropTypes.element,
  initializing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  initializing: makeSelectInitializing(),
});

export function mapDispatchToProps(dispatch) {
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
