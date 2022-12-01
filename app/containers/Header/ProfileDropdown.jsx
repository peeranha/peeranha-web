/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import { css } from '@emotion/react';
import arrowDownIcon from 'images/arrowDown.svg?external';
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_SECONDARY,
  TEXT_PRIMARY,
  DARK_SECONDARY,
} from 'style-constants';
import { NO_AVATAR } from 'utils/constants';

import * as routes from 'routes-config';
import messages from 'common-messages';
import {
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { getUserAvatar } from 'utils/profileManagement';
import userBodyIconAvatar from 'images/user2.svg?external';

// import Dropdown from 'components/Dropdown';
import Dropdown from 'components/common/Dropdown';
import Span from 'components/Span';
import A from 'components/A';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import Logout from 'containers/Logout';
import Icon from 'components/Icon/index';
import { getUserName } from 'utils/user';
import { selectIsMenuVisible } from '../AppWrapper/selectors';
import { getPermissions } from 'utils/properties';

import ProfileIcon from 'icons/Profile';
import CommunitiesIcon from 'icons/Communities';
import SettingsIcon from 'icons/Settings';
import NotificationsIcon from 'icons/Notifications';
import ModerationIcon from 'icons/Moderation';
import NFTIcon from 'icons/NFT';
import PostIcon from 'icons/Post';
import LogOutIcon from 'icons/LogOut';

const colors = singleCommunityColors();
const styles = singleCommunityStyles();

const ArrowDown = styled(Icon)`
  path {
    fill: ${colors.localeArrowColor || styles.commHeadElemColor || ''};
  }
`;

const Info = styled.span`
  padding: 0 10px;

  > span:nth-child(1) {
    display: flex;
    align-items: ${(x) => (x.isMenuVisible ? 'stretch' : 'center')};
    margin-right: ${(x) => (!x.isMenuVisible ? 7 : 'auto')}px;
  }
`;

const NoAvatarBox = styled.div`
  width: 47px;
  height: 47px;
  border: ${({ isMobileVersion }) =>
    (!isMobileVersion && styles.communityBorderStyle) ||
    `1px solid ${BORDER_SECONDARY}`};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const B = ({ profileInfo, onClick, isMenuVisible, isMobileVersion }) => (
  <span className="df aic" onClick={onClick}>
    {(!profileInfo.avatar || profileInfo.avatar === NO_AVATAR) && (
      <NoAvatarBox isMobileVersion={isMobileVersion}>
        <Icon
          width="17"
          height="19"
          icon={userBodyIconAvatar}
          specialStyles={!isMobileVersion && styles.dropDownIconStyles}
        />
      </NoAvatarBox>
    )}
    {profileInfo.avatar && profileInfo.avatar !== NO_AVATAR && (
      <MediumSpecialImage
        isBordered
        customBorderStyle={!isMobileVersion && colors.communityBorderStyle}
        src={getUserAvatar(profileInfo.avatar)}
        alt="avatar"
      />
    )}
    <Info
      className="d-flex flex-column justify-content-center"
      isMenuVisible={isMenuVisible}
    >
      <Span bold color={(!isMobileVersion && colors.commHeadElemColor) || ''}>
        {getUserName(profileInfo.displayName, profileInfo.loginData.account)}
      </Span>
    </Info>
    <ArrowDown
      icon={arrowDownIcon}
      width="10"
      alt="data-icon"
      className="dropdown-arrow "
      fill={DARK_SECONDARY}
    />
  </span>
);

export const Button = connect((state) => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const Link = A.extend`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const getOptions = (profileInfo) => {
  const { user } = profileInfo;

  const isModerator = useMemo(
    () => !!getPermissions(profileInfo)?.length,
    [profileInfo],
  );

  return [
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
          <PostIcon
            className="mr-2"
            stroke={colors.linkColor || TEXT_PRIMARY}
          />
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
};

const ProfileDropdown = ({ profileInfo }) => (
  <Dropdown
    id="profile_dropdown_id"
    options={getOptions(profileInfo).filter((option) => !!option)}
    trigger={<Button profileInfo={profileInfo} />}
    appendTo="parent"
  />
);

ProfileDropdown.propTypes = {
  profileInfo: PropTypes.object,
};

B.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
  isMenuVisible: PropTypes.bool,
  isMobileVersion: PropTypes.bool,
};

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ProfileDropdown);
