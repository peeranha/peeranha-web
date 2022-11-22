import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';

import Logout from 'containers/Logout';
import PropTypes from 'prop-types';
import { DARK_SECONDARY } from 'style-constants';
import { getPermissions } from '../../utils/properties';

const MobileLinksInProfile = ({ profile, isMenuVisible }) => {
  if (!profile || !isMenuVisible) {
    return null;
  }

  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  const onClick = () => setVisibilityProfileLinks(!visibleProfileLinks);

  const isModerator = Boolean(getPermissions(profile)?.length);

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={onClick}
        type="button"
      >
        <ProfileButton profileInfo={profile} isMobileVersion />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleProfileLinks}
          fill={DARK_SECONDARY}
        />
      </button>

      {visibleProfileLinks && (
        <div className="pb-2">
          <A to={routes.profileView(profile.user)}>
            <FormattedMessage id={messages.profile.id} />
          </A>

          <A to={routes.userCommunities(profile.user)}>
            <FormattedMessage id={messages.myCommunities.id} />
          </A>

          <A
            disabled={profile.postCount === 0}
            to={routes.userQuestions(profile.user)}
          >
            <FormattedMessage id={messages.posts.id} />
          </A>

          <A
            to={routes.userAnswers(profile.user)}
            disabled={profile.answersGiven === 0}
          >
            <FormattedMessage id={messages.answers.id} />
          </A>

          <A to={routes.userNotifications(profile.user)}>
            <FormattedMessage id={messages.notifications.id} />
          </A>

          <A to={routes.userNFTs(profile.user)}>
            <FormattedMessage id={messages.NFTs.id} />
          </A>

          {isModerator && (
            <A to={routes.userModeration(profile.user)}>
              <FormattedMessage id={messages.moderation.id} />
            </A>
          )}

          <Logout>
            <FormattedMessage id={messages.logout.id} />
          </Logout>
        </div>
      )}
    </div>
  );
};

MobileLinksInProfile.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
};

export default MobileLinksInProfile;
