/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import userIcon from 'images/user.svg?inline';
import messages from 'common-messages';

import LargeButton from 'components/Button/Contained/InfoLarge';

const UserAuthNavLinks = /* istanbul ignore next */ ({
  showSignUpModal,
  showLoginModal,
  isMenuVisible,
}) => (
  <React.Fragment>
    <LargeButton
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
      onClick={showSignUpModal}
    >
      <img className="mr-2" src={userIcon} alt="icon" />
      <FormattedMessage {...messages.signUp} />
    </LargeButton>

    <LargeButton
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
      onClick={showLoginModal}
    >
      <img className="mr-2" src={userIcon} alt="icon" />
      <FormattedMessage {...messages.login} />
    </LargeButton>
  </React.Fragment>
);

UserAuthNavLinks.propTypes = {
  showSignUpModal: PropTypes.func,
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(UserAuthNavLinks);
