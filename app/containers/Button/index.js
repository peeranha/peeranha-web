/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { chooseModalContent } from 'containers/Modal/actions';
import { selectAccount } from 'containers/AccountInitializer/actions';
import { makeSelectEosInit } from 'containers/AccountInitializer/selectors';

import LoginPopup from './LoginPopup';
import { COMPLETE_LOGIN } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class Button extends React.Component {
  componentDidUpdate = () => {
    const reload = localStorage.getItem('reload');
    const scrollTo = localStorage.getItem('scrollTo');

    if (reload && this.props.eosInit) {
      this.clickHandler();
      if (scrollTo) window.scrollTo(0, +scrollTo);
      localStorage.clear();
    }
  };

  reloadApp = () => {
    localStorage.setItem('reload', true);
    window.location.reload();
  };

  selectAccount = () => {
    this.props.selectAccountDispatch({
      reloadApp: this.reloadApp,
      selectAccount: this.selectAccount,
      type: COMPLETE_LOGIN,
    });
  };

  clickHandler = event => {
    const { eosInit, buttonAction, chooseModalContentDispatch } = this.props;

    const { selectedScatterAccount, userIsInSystem } = eosInit;

    if (event && event.pageY) {
      localStorage.setItem('scrollTo', event.pageY - window.screen.height / 2);
    }

    if (!selectedScatterAccount || !userIsInSystem) {
      const content = React.createElement(LoginPopup, null, this.selectAccount);
      chooseModalContentDispatch(content);
    } else {
      buttonAction();
    }
  };

  render() {
    const { buttonClass, buttonContent } = this.props;

    return (
      <button type="button" className={buttonClass} onClick={this.clickHandler}>
        {buttonContent}
      </button>
    );
  }
}

Button.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  chooseModalContentDispatch: PropTypes.func.isRequired,
  selectAccountDispatch: PropTypes.func.isRequired,
  eosInit: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    chooseModalContentDispatch: content =>
      dispatch(chooseModalContent(content)),
    selectAccountDispatch: methods => dispatch(selectAccount(methods)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
