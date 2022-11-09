/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY, TEXT_PRIMARY } from 'style-constants';
import { NO_AVATAR } from 'utils/constants';

import * as routes from 'routes-config';
import messages from 'common-messages';
import {
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';

import logoutIcon from 'images/logout.svg?external';

import { getUserAvatar } from 'utils/profileManagement';
import userBodyIconAvatar from 'images/user2.svg?external';

import Dropdown from 'components/Dropdown';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import A from 'components/A';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { IconLg } from 'components/Icon/IconWithSizes';
import Logout from 'containers/Logout';
import Icon from 'components/Icon/index';
import { getUserName } from 'utils/user';
import { selectIsMenuVisible } from '../AppWrapper/selectors';
import { getPermissions } from '../../utils/properties';

const styles = singleCommunityStyles();
const colors = singleCommunityColors();

const StatusBox = styled.span`
  display: inline-flex;
  font-size: 14px;
  margin-top: 2px;
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
    <Info
      className="d-flex flex-column justify-content-center"
      isMenuVisible={isMenuVisible}
    >
      <Span bold color={(!isMobileVersion && colors.commHeadElemColor) || ''}>
        {getUserName(profileInfo.displayName, profileInfo.loginData.account)}
      </Span>
    </Info>
  </span>
);

export const Button = connect((state) => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const Menu = memo(
  ({ profileInfo, questionsLength, questionsWithUserAnswersLength }) => {
    const { user, loginData } = profileInfo;
    const isEmail = loginData.email;

    const isModerator = useMemo(
      () => !!getPermissions(profileInfo)?.length,
      [profileInfo],
    );

    return (
      <nav>
        <Ul>
          <A to={routes.profileView(user)}>
            <FormattedMessage {...messages.profile} />
          </A>
          <A to={routes.userCommunities(user)}>
            <FormattedMessage {...messages.myCommunities} />
          </A>
          <A
            to={routes.userQuestions(user)}
            disabled={!questionsLength}
            tabIndex={!questionsLength ? '-1' : undefined}
          >
            <FormattedMessage {...messages.posts} />
          </A>
          <A
            to={routes.userAnswers(user)}
            disabled={!questionsWithUserAnswersLength}
            tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
          >
            <FormattedMessage {...messages.answers} />
          </A>
          <A
            className={!isEmail ? 'd-none' : ''}
            to={routes.userSettings(user)}
          >
            <FormattedMessage {...messages.settings} />
          </A>
          <A to={routes.userNotifications(user)}>
            <FormattedMessage {...messages.notifications} />
          </A>
          <A to={routes.userNFTs(user)}>
            <FormattedMessage id={messages.NFTs.id} />
          </A>
          {isModerator && (
            <A to={routes.userModeration(user)}>
              <FormattedMessage {...messages.moderation} />
            </A>
          )}
        </Ul>

        <Ul>
          <Logout>
            <IconLg
              className="mr-1"
              icon={logoutIcon}
              color={colors.linkColor || TEXT_PRIMARY}
              isColorImportant={true}
            />
            <Span color={colors.linkColor || TEXT_PRIMARY}>
              <FormattedMessage id={messages.logout.id} />
            </Span>
          </Logout>
        </Ul>
      </nav>
    );
  },
);

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
  loginWithScatter: PropTypes.bool,
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
