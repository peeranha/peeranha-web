import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';

import Logout from 'containers/Logout';

export default React.memo(({ profile, isMenuVisible }) => {
  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  if (!profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={() => setVisibilityProfileLinks(!visibleProfileLinks)}
      >
        <ProfileButton profileInfo={profile} />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleProfileLinks}
        />
      </button>

      {visibleProfileLinks && (
        <div className="pb-2">
          <A to={routes.profileView(profile.user)}>
            <FormattedMessage {...messages.profile} />
          </A>

          <A to={routes.userCommunities(profile.user)}>
            <FormattedMessage {...messages.myCommunities} />
          </A>

          <A to={routes.userQuestions(profile.user)}>
            <FormattedMessage {...messages.questions} />
          </A>

          <A to={routes.userAnswers(profile.user)}>
            <FormattedMessage {...messages.answers} />
          </A>

          <A to={routes.userSettings(profile.user)}>
            <FormattedMessage {...messages.settings} />
          </A>

          <A to={routes.userNotifications(profile.user)}>
            <FormattedMessage {...messages.notifications} />
          </A>

          <Logout>
            <FormattedMessage {...messages.logout} />
          </Logout>
        </div>
      )}
    </div>
  );
});
