import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';
import messages from 'common-messages';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';

import ProfileIcon from 'icons/Profile';
import CommunitiesIcon from 'icons/Communities';
import SettingsIcon from 'icons/Settings';
import NotificationsIcon from 'icons/Notifications';
import ModerationIcon from 'icons/Moderation';
import NFTIcon from 'icons/NFT';
import PostIcon from 'icons/Post';
import LogOutIcon from 'icons/LogOut';
import Logout from 'containers/Logout';
import { singleCommunityColors } from 'utils/communityManagement';
import { User } from 'containers/Administration/types';

const Link = A.extend`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const colors = singleCommunityColors();

export const profileDropdownConfig = (
  user: User,
  profileInfo: { postCount: any },
  isModerator: boolean,
) => [
  {
    value: 1,
    render: (
      <Link to={routes.profileView(user)}>
        <ProfileIcon
          className="mr-2"
          size={[18, 18]}
          stroke={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.profile.id} />
      </Link>
    ),
  },
  {
    value: 2,
    render: (
      <Link to={routes.userCommunities(user)}>
        <CommunitiesIcon
          className="mr-2"
          size={[18, 18]}
          stroke={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.myCommunities.id} />
      </Link>
    ),
  },
  {
    value: 3,
    render: (
      <Link
        to={routes.userQuestions(user)}
        disabled={!profileInfo.postCount}
        tabIndex={!profileInfo.postCount ? '-1' : undefined}
      >
        <PostIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
        <FormattedMessage id={messages.posts.id} />
      </Link>
    ),
  },
  {
    value: 4,
    render: (
      <Link to={routes.userNotifications(user)}>
        <NotificationsIcon
          className="mr-2"
          stroke={colors.linkColor || TEXT_PRIMARY}
          fill={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.notifications.id} />
      </Link>
    ),
  },
  {
    value: 5,
    render: (
      <Link to={routes.userNFTs(user)}>
        <NFTIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
        <FormattedMessage id={messages.NFTs.id} />
      </Link>
    ),
  },
  isModerator && {
    value: 6,
    render: (
      <Link to={routes.userModeration(user)}>
        <ModerationIcon
          size={[18, 18]}
          className="mr-2"
          stroke={colors.linkColor || TEXT_PRIMARY}
          fill={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.moderation.id} />
      </Link>
    ),
  },
  {
    value: 7,
    render: (
      <Link to={routes.userSettings(user)}>
        <SettingsIcon
          className="mr-2"
          stroke={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.settings.id} />
      </Link>
    ),
  },
  {
    value: 8,
    render: (
      <Logout>
        <LogOutIcon
          className="mr-2"
          stroke={colors.linkColor || TEXT_PRIMARY}
        />
        <FormattedMessage id={messages.logout.id} />
      </Logout>
    ),
  },
];
