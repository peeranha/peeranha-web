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

import { makeSelectEos } from 'containers/EosioProvider/selectors';

import { getCurrentAccount } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AccountInitializer extends React.Component {
  componentDidMount() {}

  componentDidUpdate = async () => {
    this.props.getCurrentAccountDispatch();

    console.log(`EOS init: ${this.props.eos.initialized}`);
    console.log(`Scatter installed: ${this.props.eos.scatterInstalled}`);

    const selectedAccount = await this.props.eos.getSelectedAccount();
    console.log(`Current selected account: ${selectedAccount}`);

    const newSelectedAccount = await this.props.eos.selectAccount();
    console.log(`New selected account: ${newSelectedAccount}`);
  };

  render() {
    return [React.Children.only(this.props.children)];
  }
}

AccountInitializer.propTypes = {
  eos: PropTypes.object.isRequired,
  getCurrentAccountDispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eos: makeSelectEos(),
});

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
