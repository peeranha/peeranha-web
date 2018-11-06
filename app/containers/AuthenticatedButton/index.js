/**
 *
 * AuthenticatedButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectUserIsInSystem } from 'containers/AccountProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

/* eslint-disable react/prefer-stateless-function */
export class AuthenticatedButton extends React.Component {
  clickHandler = () => {
    const { userIsInSystem, buttonAction, showLoginModalDispatch } = this.props;

    if (!userIsInSystem) {
      showLoginModalDispatch();
    } else if (buttonAction) {
      buttonAction();
    }
  };

  render() {
    const { buttonClass, buttonContent, buttonType, isLoading } = this.props;

    return (
      <button
        type={buttonType || 'button'}
        className={buttonClass}
        onClick={this.clickHandler}
      >
        {isLoading && <LoadingIndicator />}
        {!isLoading && buttonContent}
      </button>
    );
  }
}

AuthenticatedButton.propTypes = {
  buttonAction: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  buttonClass: PropTypes.string,
  buttonType: PropTypes.string,
  buttonContent: PropTypes.string,
  userIsInSystem: PropTypes.bool,
  isLoading: PropTypes.bool,
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
