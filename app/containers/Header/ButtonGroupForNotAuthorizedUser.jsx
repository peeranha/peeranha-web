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
import MediumOutlinedButton from 'components/Button/Outlined/InfoMedium';
import MediumContainedButton from 'components/Button/Contained/InfoMedium';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

const ButtonGroupForNotAuthorizedUser = ({ showLoginModal }) =>
  !isSingleCommunityWebsite() ? (
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
  ) : (
    <>
      <MediumOutlinedButton
        className="d-none d-sm-flex"
        onClick={showLoginModal}
      >
        <FormattedMessage {...messages.login} />
      </MediumOutlinedButton>

      <MediumContainedButton
        className="d-none d-sm-flex"
        style={{ marginLeft: '15px' }}
        onClick={() => createdHistory.push(routes.signup.email.name)}
      >
        <img
          style={{ width: '17px' }}
          className="mr-2 mt-0"
          src={userIcon}
          alt="icon"
        />
        <FormattedMessage {...messages.signUp} />
      </MediumContainedButton>
    </>
  );

ButtonGroupForNotAuthorizedUser.propTypes = {
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
