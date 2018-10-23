import React from 'react';
import PropTypes from 'prop-types';

const UserAuthNavLinksComponent = props => [
  <button
    key="signup"
    onClick={props.showSignUpModal}
    className="btn btn-secondary my-2 my-sm-0 mr-2"
  >
    Sign Up
  </button>,
  <button
    key="login"
    onClick={props.showLoginModal}
    className="btn btn-secondary my-2 my-sm-0"
  >
    Log In
  </button>,
];

UserAuthNavLinksComponent.propTypes = {
  showSignUpModal: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default UserAuthNavLinksComponent;
