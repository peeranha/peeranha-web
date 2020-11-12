/**
 *
 * ButtonGroupForNotAuthorizedUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import userIcon from 'images/user.svg?inline';
import messages from 'common-messages';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import LargeContainedButton from 'components/Button/Contained/InfoLarge';

const ButtonGroupForNotAuthorizedUser = ({ showLoginModal }) => (
  <>
    <LargeOutlinedButton
      className="d-none d-sm-flex"
      onClick={showLoginModal}
    >
      <FormattedMessage {...messages.login} />
    </LargeOutlinedButton>

    <LargeContainedButton
      className="d-none d-sm-flex"
      onClick={() => createdHistory.push(routes.signup.email.name)}
    >
      <img className="mr-2" src={userIcon} alt="icon" />
      <FormattedMessage {...messages.signUp} />
    </LargeContainedButton>

  </>
);

ButtonGroupForNotAuthorizedUser.propTypes = {
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
