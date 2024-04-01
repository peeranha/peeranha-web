import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import PropTypes from 'prop-types';

import { TEXT_PRIMARY, DARK_SECONDARY } from 'style-constants';
import arrowDownIcon from 'images/arrowDown.svg?external';
import AnswerWithAIcon from 'icons/AnswerWithA';
import ProfileIcon from 'icons/Profile';
import CommunitiesIcon from 'icons/Communities';
import SettingsIcon from 'icons/Settings';
import NotificationsIcon from 'icons/Notifications';
import ModerationIcon from 'icons/Moderation';
import NFTIcon from 'icons/NFT';
import PostIcon from 'icons/Post';
import LogOutIcon from 'icons/LogOut';

import { isSuiBlockchain } from 'utils/constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { getPermissions } from 'utils/properties';

import Logout from 'containers/Logout';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';
import A from 'components/A';
import Icon from 'components/Icon';
import {
  UserGraph,
  UsersThreeGraph,
  NoteGraph,
  ChatCenteredTextGraph,
  BellGraph,
  AwardGraph,
  PencilSimpleLineGraph,
  GearGraph,
  SignOutGraph,
} from 'components/icons';

const graphCommunity = graphCommunityColors();

const MobileLinksInProfile = ({ profile, isMenuVisible }) => {
  const { t } = useTranslation();
  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  if (!profile || !isMenuVisible) {
    return null;
  }

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
            {graphCommunity ? (
              <UserGraph className="mr-2" size={[24, 24]} />
            ) : (
              <ProfileIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
              />
            )}
            {t('common.profile')}
          </A>

          <A to={routes.userCommunities(profile.user)}>
            {graphCommunity ? (
              <UsersThreeGraph className="mr-2" size={[24, 24]} />
            ) : (
              <CommunitiesIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
              />
            )}
            {t('common.myCommunities')}
          </A>

          <A disabled={profile.postCount === 0} to={routes.userQuestions(profile.user)}>
            {graphCommunity ? (
              <NoteGraph className="mr-2" size={[24, 24]} />
            ) : (
              <PostIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
              />
            )}
            {t('common.posts')}
          </A>

          <A to={routes.userAnswers(profile.user)} disabled={profile.answersGiven === 0}>
            {graphCommunity ? (
              <ChatCenteredTextGraph className="mr-2" size={[24, 24]} />
            ) : (
              <AnswerWithAIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
              />
            )}{' '}
            {t('common.answers')}
          </A>

          <A to={routes.userNotifications(profile.user)}>
            {graphCommunity ? (
              <BellGraph className="mr-2" size={[24, 24]} />
            ) : (
              <NotificationsIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
                fill={colors.linkColor || TEXT_PRIMARY}
              />
            )}
            {t('common.notifications')}
          </A>

          <A to={routes.userNFTs(profile.user)}>
            {graphCommunity ? (
              <AwardGraph className="mr-2" size={[24, 24]} />
            ) : (
              <NFTIcon className="mr-2" size={[24, 24]} stroke={colors.linkColor || TEXT_PRIMARY} />
            )}
            {t('common.NFTs')}
          </A>

          {!isSuiBlockchain && (
            <A to={routes.userSettings(profile.user)}>
              {graphCommunity ? (
                <GearGraph className="mr-2" size={[24, 24]} />
              ) : (
                <SettingsIcon
                  className="mr-2"
                  size={[24, 24]}
                  stroke={colors.linkColor || TEXT_PRIMARY}
                />
              )}
              {t('common.settings')}
            </A>
          )}

          {isModerator && (
            <A to={routes.userModeration(profile.user)}>
              {graphCommunity ? (
                <PencilSimpleLineGraph className="mr-2" size={[24, 24]} />
              ) : (
                <ModerationIcon
                  size={[24, 24]}
                  className="mr-2"
                  stroke={colors.linkColor || TEXT_PRIMARY}
                  fill={colors.linkColor || TEXT_PRIMARY}
                />
              )}
              {t('common.moderation')}
            </A>
          )}

          <Logout>
            {graphCommunity ? (
              <SignOutGraph className="mr-2" size={[24, 24]} />
            ) : (
              <LogOutIcon
                className="mr-2"
                size={[24, 24]}
                stroke={colors.linkColor || TEXT_PRIMARY}
              />
            )}
            {t('common.logout')}
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
