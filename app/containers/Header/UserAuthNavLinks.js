/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import userIcon from 'svg/user';

import Icon from 'components/Icon';
import Button from 'components/Button';

import messages from './messages';

const UserAuthNavLinks = ({ showSignUpModal, showLoginModal }) => [
  <Button key="signUp" onClick={showSignUpModal}>
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.signUp} />
  </Button>,
  <Button key="login" onClick={showLoginModal}>
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.login} />
  </Button>,
];

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func,
  showLoginModal: PropTypes.func,
};

export default UserAuthNavLinks;
