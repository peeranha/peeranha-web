/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
const UserAuthNavLinks = props => (
  <div className="auth-button-group">
    <button
      key="signup"
      onClick={props.showSignUpModal}
      className="btn btn-secondary my-2 my-sm-0 mr-2"
    >
      <FormattedMessage {...messages.signUp} />
    </button>
    <button
      key="login"
      onClick={props.showLoginModal}
      className="btn btn-secondary my-2 my-sm-0"
    >
      <FormattedMessage {...messages.login} />
    </button>
  </div>
);

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default UserAuthNavLinks;
