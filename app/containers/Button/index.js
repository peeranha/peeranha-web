/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectEosInit } from 'containers/AccountInitializer/selectors';
import { showLoginModal } from 'containers/Login/actions';

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

  clickHandler = event => {
    const { eosInit, buttonAction, showLoginModalDispatch } = this.props;

    const { selectedScatterAccount, userIsInSystem } = eosInit;

    if (event && event.pageY) {
      localStorage.setItem('scrollTo', event.pageY - window.screen.height / 2);
    }

    if (!selectedScatterAccount || !userIsInSystem) {
      showLoginModalDispatch();
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
  showLoginModalDispatch: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  eosInit: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
