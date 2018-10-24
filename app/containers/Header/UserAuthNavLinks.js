/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
const UserAuthNavLinks = props => (
  <div className="auth-button-group">
    <button
      key="signup"
      onClick={props.showSignUpModal}
      className="btn btn-secondary my-2 my-sm-0 mr-2"
    >
      Sign Up
    </button>
    <button
      key="login"
      onClick={props.showLoginModal}
      className="btn btn-secondary my-2 my-sm-0"
    >
      Log In
    </button>
  </div>
);

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default UserAuthNavLinks;
