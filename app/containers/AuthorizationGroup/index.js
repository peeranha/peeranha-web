/**
 *
 * AuthorizationGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import createdHistory from 'createdHistory';

import { makeSelectEosInit } from 'containers/AccountInitializer/selectors';
import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

/* eslint-disable react/prefer-stateless-function */
export class AuthorizationGroup extends React.Component {
  showSignUpModal = () => this.props.showSignUpModalDispatch();

  showLoginModal = () => this.props.showLoginModalDispatch();

  pushToProfile = () =>
    createdHistory.push(`/users/${this.props.eosInit.selectedScatterAccount}`);

  render() {
    const { eosInit } = this.props;
    const logged =
      eosInit && eosInit.selectedScatterAccount && eosInit.userIsInSystem;

    return (
      <div className="auth-button-group">
        {logged && (
          <button
            onClick={this.pushToProfile}
            className="btn btn-secondary my-2 my-sm-0"
          >
            Profile
          </button>
        )}

        {!logged && [
          <button
            onClick={this.showSignUpModal}
            className="btn btn-secondary my-2 my-sm-0 mr-2"
          >
            Sign Up
          </button>,
          <button
            onClick={this.showLoginModal}
            className="btn btn-secondary my-2 my-sm-0"
          >
            Log In
          </button>,
        ]}
      </div>
    );
  }
}

AuthorizationGroup.propTypes = {
  eosInit: PropTypes.object.isRequired,
  showSignUpModalDispatch: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizationGroup);
