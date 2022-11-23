import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';
import { TEXT_PRIMARY, PEER_PRIMARY_TRANSPARENT_COLOR } from 'style-constants';

import Logout from 'containers/Logout';
import PropTypes from 'prop-types';
import { DARK_SECONDARY } from 'style-constants';
import { getPermissions } from '../../utils/properties';
import { singleCommunityColors } from 'utils/communityManagement';

import AnswerWithAIcon from 'icons/AnswerWithA';
import ProfileIcon from 'icons/Profile';
import CommunitiesIcon from 'icons/Communities';
import SettingsIcon from 'icons/Settings';
import NotificationsIcon from 'icons/Notifications';
import ModerationIcon from 'icons/Moderation';
import NFTIcon from 'icons/NFT';
import PostIcon from 'icons/Post';
import LogOutIcon from 'icons/LogOut';

const MobileLinksInProfile = ({ profile, isMenuVisible }) => {
  if (!profile || !isMenuVisible) {
    return null;
  }

  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  const onClick = () => setVisibilityProfileLinks(!visibleProfileLinks);

  const isModerator = Boolean(getPermissions(profile)?.length);
  const colors = singleCommunityColors();

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
            <ProfileIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.profile.id} />
          </A>

          <A to={routes.userCommunities(profile.user)}>
            <CommunitiesIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.myCommunities.id} />
          </A>

          <A
            disabled={profile.postCount === 0}
            to={routes.userQuestions(profile.user)}
          >
            <PostIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.posts.id} />
          </A>

          <A
            to={routes.userAnswers(profile.user)}
            disabled={profile.answersGiven === 0}
          >
            <AnswerWithAIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.answers.id} />
          </A>

          <A to={routes.userNotifications(profile.user)}>
            <NotificationsIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
              fill={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.notifications.id} />
          </A>

          <A to={routes.userNFTs(profile.user)}>
            <NFTIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.NFTs.id} />
          </A>

          <A to={routes.userSettings(profile.user)}>
            <SettingsIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
            <FormattedMessage id={messages.settings.id} />
          </A>

          {isModerator && (
            <A to={routes.userModeration(profile.user)}>
              <ModerationIcon
                size={[24, 24]}
                className="mr-2"
                stroke={colors.linkColor || TEXT_PRIMARY}
                fill={colors.linkColor || TEXT_PRIMARY}
              />
              <FormattedMessage id={messages.moderation.id} />
            </A>
          )}

          <Logout>
            <LogOutIcon
              className="mr-2"
              size={[24, 24]}
              stroke={colors.linkColor || TEXT_PRIMARY}
            />
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
