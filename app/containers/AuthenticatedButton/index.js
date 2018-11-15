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
  clickHandler = ev => {
    const { userIsInSystem, buttonAction, showLoginModalDispatch } = this.props;

    if (!userIsInSystem) {
      showLoginModalDispatch();
    } else if (buttonAction) {
      buttonAction(ev);
    }
  };

  render() {
    const { content, type, isLoading, disabled } = this.props;

    const props = { ...this.props };
    Object.keys(this.props)
      .filter(x => typeof this.props[x] !== 'string')
      .map(x => delete props[x]);

    return (
      <button
        {...props}
        disabled={disabled}
        type={type || 'button'}
        onClick={this.clickHandler}
      >
        {isLoading && <LoadingIndicator />}
        {!isLoading && content}
      </button>
    );
  }
}

AuthenticatedButton.propTypes = {
  buttonAction: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.string,
  userIsInSystem: PropTypes.bool,
  disabled: PropTypes.bool,
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
