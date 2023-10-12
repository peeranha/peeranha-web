import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { BORDER_SECONDARY, TEXT_PRIMARY } from 'style-constants';
import { isSuiBlockchain, NO_AVATAR } from 'utils/constants';

import * as routes from 'routes-config';
import { singleCommunityColors, singleCommunityStyles } from 'utils/communityManagement';

import { getUserAvatar } from 'utils/profileManagement';
import userBodyIconAvatar from 'images/user2.svg?external';

import Dropdown from 'components/Dropdown';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import A from 'components/A';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import Logout from 'containers/Logout';
import Icon from 'components/Icon/index';
import { getUserName } from 'utils/user';
import { selectIsMenuVisible } from '../AppWrapper/selectors';
import { getPermissions } from '../../utils/properties';

import AnswerWithAIcon from 'icons/AnswerWithA';
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

const Info = styled.span`
  padding: 0 10px;

  > span:nth-child(1) {
    display: flex;
    align-items: ${(x) => (x.isMenuVisible ? 'stretch' : 'center')};
    margin-right: ${(x) => (!x.isMenuVisible ? 7 : 'auto')}px;
  }
`;

const NoAvatarBox = styled.div`
  width: 40px;
  height: 40px;
  border: ${({ isMobileVersion }) =>
    (!isMobileVersion && styles.communityBorderStyle) || `1px solid ${BORDER_SECONDARY}`};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 992px) {
    width: 47px;
    height: 47px;
  }
`;

const B = ({ profileInfo, onClick, isMenuVisible, isMobileVersion }) => (
  <span className="d-flex" onClick={onClick}>
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
    <Info className="d-flex flex-column justify-content-center" isMenuVisible={isMenuVisible}>
      <Span bold color={(!isMobileVersion && colors.commHeadElemColor) || ''}>
        {getUserName(profileInfo.displayName, profileInfo.loginData.account)}
      </Span>
    </Info>
  </span>
);

export const Button = connect((state) => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const Menu = ({ profileInfo, questionsLength, questionsWithUserAnswersLength }) => {
  const { t } = useTranslation();
  const { user, loginData } = profileInfo;

  const isModerator = useMemo(() => !!getPermissions(profileInfo)?.length, [profileInfo]);

  return (
    <nav>
      <Ul>
        <A to={routes.profileView(user)}>
          <ProfileIcon className="mr-2" size={[18, 18]} stroke={colors.linkColor || TEXT_PRIMARY} />
          {t('common.profile')}
        </A>
        <A to={routes.userCommunities(user)}>
          <CommunitiesIcon
            className="mr-2"
            size={[18, 18]}
            stroke={colors.linkColor || TEXT_PRIMARY}
          />
          {t('common.myCommunities')}
        </A>
        <A
          to={routes.userQuestions(user)}
          disabled={!questionsLength}
          tabIndex={!questionsLength ? '-1' : undefined}
        >
          <PostIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
          {t('common.posts')}
        </A>

        <A
          to={routes.userAnswers(user)}
          disabled={!questionsWithUserAnswersLength}
          tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
        >
          <AnswerWithAIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
          {t('common.answers')}
        </A>
        <A to={routes.userNotifications(user)}>
          <NotificationsIcon
            className="mr-2"
            stroke={colors.linkColor || TEXT_PRIMARY}
            fill={colors.linkColor || TEXT_PRIMARY}
          />
          {t('common.notifications')}
        </A>
        <A to={routes.userNFTs(user)}>
          <NFTIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
          {t('common.NFTs')}
        </A>
        {isModerator && (
          <A to={routes.userModeration(user)}>
            <ModerationIcon
              size={[18, 18]}
              className="mr-2"
              stroke={colors.linkColor || TEXT_PRIMARY}
              fill={colors.linkColor || TEXT_PRIMARY}
            />
            {t('common.moderation')}
          </A>
        )}
        {!isSuiBlockchain && (
          <A to={routes.userSettings(user)}>
            <SettingsIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
            {t('common.settings')}
          </A>
        )}
      </Ul>

      <Ul>
        <Logout>
          <LogOutIcon className="mr-2" stroke={colors.linkColor || TEXT_PRIMARY} />
          {t('common.logout')}
        </Logout>
      </Ul>
    </nav>
  );
};

const ProfileDropdown = ({ profileInfo }) => (
  <Dropdown
    isArrowed
    className="d-none d-md-flex"
    id="profile_dropdown_id"
    button={<Button profileInfo={profileInfo} />}
    menu={
      <Menu
        profileInfo={profileInfo}
        questionsLength={profileInfo.postCount}
        questionsWithUserAnswersLength={profileInfo.answersGiven}
      />
    }
  />
);

ProfileDropdown.propTypes = {
  profileInfo: PropTypes.object,
};

Menu.propTypes = {
  profileInfo: PropTypes.object,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
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
