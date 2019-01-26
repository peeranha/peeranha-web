/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
const UserAuthNavLinks = ({ showSignUpModal, showLoginModal }) => [
  <Button key="signUp" onClick={showSignUpModal}>
    <FontAwesomeIcon className="chevron user" icon="user" />
    <FormattedMessage {...messages.signUp} />
  </Button>,
  <Button key="login" onClick={showLoginModal}>
    <FontAwesomeIcon className="chevron sign-in-alt" icon="sign-in-alt" />
    <FormattedMessage {...messages.login} />
  </Button>,
];

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func,
  showLoginModal: PropTypes.func,
};

export default UserAuthNavLinks;
