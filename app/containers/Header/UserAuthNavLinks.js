/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import userIcon from 'svg/user';
import messages from 'common-messages';

import Icon from 'components/Icon';
import LargeButton from 'components/Button/LargeButton';

const UserAuthNavLinks = /* istanbul ignore next */ ({
  showSignUpModal,
  showLoginModal,
  isMenuVisible,
}) => [
  <LargeButton
    className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
    key="signUp"
    onClick={showSignUpModal}
  >
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.signUp} />
  </LargeButton>,

  <LargeButton
    className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
    key="login"
    onClick={showLoginModal}
  >
    <Icon icon={userIcon} />
    <FormattedMessage {...messages.login} />
  </LargeButton>,
];

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func,
  showLoginModal: PropTypes.func,
};

export default React.memo(UserAuthNavLinks);
