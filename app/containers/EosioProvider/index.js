/**
 *
 * EosioProvider
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

import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import { initEosio } from './actions';
import { makeSelectInitializing, makeSelectEos } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class EosioProvider extends React.Component {
  componentDidMount() {
    this.props.initEosio();
  }

  render() {
    return (
      <div>
        {!this.props.initializing && this.props.eos ? (
          this.props.children
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

EosioProvider.propTypes = {
  initEosio: PropTypes.func,
  children: PropTypes.element,
  initializing: PropTypes.bool,
  eos: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  initializing: makeSelectInitializing(),
  eos: makeSelectEos(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    initEosio: bindActionCreators(initEosio, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'eosioProvider', reducer });
const withSaga = injectSaga({ key: 'eosioProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EosioProvider);
