/**
 *
 * AuthenticatedButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUserIsInSystem } from 'containers/AccountProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

/* eslint-disable react/prefer-stateless-function */
export class AuthenticatedButton extends React.Component {
  clickHandler = () => {
    let choice;
    const { userIsInSystem, buttonAction, showLoginModalDispatch } = this.props;

    if (!userIsInSystem) {
      choice = showLoginModalDispatch();
    } else {
      choice = buttonAction();
    }

    return choice;
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

AuthenticatedButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  userIsInSystem: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userIsInSystem: makeSelectUserIsInSystem(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedButton);
