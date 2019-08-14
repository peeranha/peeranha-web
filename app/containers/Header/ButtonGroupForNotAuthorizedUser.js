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

const ButtonGroupForNotAuthorizedUser = /* istanbul ignore next */ ({
  showLoginModal,
  isMenuVisible,
}) => (
  <React.Fragment>
    <LargeOutlinedButton
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
      onClick={showLoginModal}
    >
      <FormattedMessage {...messages.login} />
    </LargeOutlinedButton>

    <LargeContainedButton
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-flex'}`}
      onClick={() => createdHistory.push(routes.signup.email.name)}
    >
      <img className="mr-2" src={userIcon} alt="icon" />
      <FormattedMessage {...messages.signUp} />
    </LargeContainedButton>
  </React.Fragment>
);

ButtonGroupForNotAuthorizedUser.propTypes = {
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
