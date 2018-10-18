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
import { selectPopupAccount } from 'containers/AccountInitializer/actions';

import {
  makeSelectEosInit,
  makeSelectUserIsInSystem,
} from 'containers/AccountInitializer/selectors';
import SignUp from 'containers/SignUp';
import ScatterInstaller from './ScatterInstaller';

/* eslint-disable react/prefer-stateless-function */
export class Button extends React.Component {
  componentDidUpdate = () => {
    const reload = localStorage.getItem('reload');
    const scrollTo = localStorage.getItem('scrollTo');

    if (reload && this.props.eosInit) {
      this.clickHandler({});
      if (scrollTo) window.scrollTo(0, +scrollTo);
      localStorage.clear();
    }
  };

  reloadApp = () => {
    localStorage.setItem('reload', true);
    window.location.reload();
  };

  clickHandler = event => {
    let content;
    const {
      eosInit,
      chooseModalContentDispatch,
      buttonAction,
      selectPopupAccountDispatch,
    } = this.props;

    const {
      selectedScatterAccount,
      userIsInSystem,
      scatterInstalled,
      scatterInstance,
    } = eosInit;

    const userEntered = this.props.userIsInSystem;

    if (
      selectedScatterAccount === undefined ||
      userIsInSystem === undefined ||
      scatterInstalled === undefined ||
      scatterInstance === undefined
    ) {
      alert('EOS is not initialized');
      return;
    }

    if (!scatterInstalled) {
      content = [ScatterInstaller, null, this.reloadApp];
    } else if (
      !selectedScatterAccount &&
      !userIsInSystem &&
      !scatterInstance.identity
    ) {
      if (event) selectPopupAccountDispatch(this.clickHandler);
    } else if (!userEntered && !userIsInSystem) {
      content = [SignUp, null, null];
    } else if (typeof buttonAction === 'function') {
      buttonAction();
    }

    if (event && event.pageY) {
      localStorage.setItem('scrollTo', event.pageY - window.screen.height / 2);
    }

    if (content) {
      chooseModalContentDispatch(
        React.createElement(content[0], content[1], content[2]),
      );
    }
  };

  render() {
    const { buttonClass, buttonContent } = this.props;

    return (
      <button className={buttonClass} onClick={this.clickHandler}>
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
  selectPopupAccountDispatch: PropTypes.func.isRequired,
  eosInit: PropTypes.object.isRequired,
  userIsInSystem: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
  userIsInSystem: makeSelectUserIsInSystem(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    chooseModalContentDispatch: content =>
      dispatch(chooseModalContent(content)),
    selectPopupAccountDispatch: res => dispatch(selectPopupAccount(res)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
