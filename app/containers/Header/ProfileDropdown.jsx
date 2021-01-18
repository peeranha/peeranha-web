/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY, TEXT_PRIMARY } from 'style-constants';
import { MODERATOR_KEY, NO_AVATAR } from 'utils/constants';

import * as routes from 'routes-config';
import messages from 'common-messages';
import { singleCommunityStyles } from 'utils/communityManagement';

import logoutIcon from 'images/logout.svg?external';

import { getUserAvatar } from 'utils/profileManagement';
import userBodyIconAvatar from 'images/user2.svg?external';

import Dropdown from 'components/Dropdown';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { IconLg } from 'components/Icon/IconWithSizes';
import Logout from 'containers/Logout';
import Icon from 'components/Icon/index';

import { selectIsMenuVisible } from '../AppWrapper/selectors';

const styles = singleCommunityStyles();

const StatusBox = styled.span`
  display: inline-flex;
  font-size: 14px;
  margin-top: 2px;
`;

const Info = styled.span`
  padding: 0 10px;

  > span:nth-child(1) {
    display: flex;
    align-items: ${x => (x.isMenuVisible ? 'stretch' : 'center')};
    margin-right: ${x => (!x.isMenuVisible ? 7 : 'auto')}px;
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
    {(!profileInfo.ipfs_avatar || profileInfo.ipfs_avatar === NO_AVATAR) && (
      <NoAvatarBox isMobileVersion={isMobileVersion}>
        <Icon
          width="17"
          height="19"
          icon={userBodyIconAvatar}
          specialStyles={!isMobileVersion && styles.dropDownIconStyles}
        />
      </NoAvatarBox>
    )}
    {profileInfo.ipfs_avatar &&
      profileInfo.ipfs_avatar !== NO_AVATAR && (
        <MediumSpecialImage
          isBordered
          customBorderStyle={!isMobileVersion && styles.communityBorderStyle}
          src={getUserAvatar(profileInfo.ipfs_avatar)}
          alt="ipfs_avatar"
        />
      )}
    <Info
      className="d-flex flex-column justify-content-center"
      isMenuVisible={isMenuVisible}
    >
      <Span bold color={(!isMobileVersion && styles.commHeadElemColor) || ''}>
        {profileInfo?.['display_name']}
      </Span>
      <StatusBox>
        <RatingStatus
          rating={profileInfo.rating}
          size="sm"
          isRankOff
          ratingNumColor={!isMobileVersion && styles.commHeadElemColor}
          customRatingIconColors={
            !isMobileVersion && styles.customRatingIconColors
          }
        />
        <AchievementsStatus
          count={profileInfo.achievements_reached?.length}
          achievementsNumColor={!isMobileVersion && styles.commHeadElemColor}
          achievIconStyles={!isMobileVersion && styles.achievIconStyles}
        />
      </StatusBox>
    </Info>
  </span>
);

export const Button = connect(state => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const Menu = memo(
  ({
    profileInfo: { user, permissions, integer_properties: integerProperties },
    questionsLength,
    questionsWithUserAnswersLength,
  }) => {
    const isGlobalModerator = useMemo(
      () => integerProperties?.find(x => x.key === MODERATOR_KEY),
      [integerProperties],
    );

    const isModerator =
      isGlobalModerator || (permissions && !!permissions.length);

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
            <FormattedMessage {...messages.questions} />
          </A>
          <A
            to={routes.userAnswers(user)}
            disabled={!questionsWithUserAnswersLength}
            tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
          >
            <FormattedMessage {...messages.answers} />
          </A>
          <A to={routes.userSettings(user)}>
            <FormattedMessage {...messages.settings} />
          </A>
          <A to={routes.userNotifications(user)}>
            <FormattedMessage {...messages.notifications} />
          </A>
          <A to={routes.userAchievements(user)}>
            <FormattedMessage {...messages.achievements} />
          </A>
          {isModerator && (
            <A to={routes.userModeration(user)}>
              <FormattedMessage {...messages.moderation} />
            </A>
          )}
        </Ul>

        <Ul>
          <Logout>
            <IconLg className="mr-1" icon={logoutIcon} />
            <Span color={TEXT_PRIMARY}>
              <FormattedMessage {...messages.logout} />
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
        questionsLength={profileInfo.questions_asked}
        questionsWithUserAnswersLength={profileInfo.answers_given}
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
