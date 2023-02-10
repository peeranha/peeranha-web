/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import { profileDropdownConfig } from 'containers/Header/ProfileDropdownConfig';
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { BORDER_SECONDARY, DARK_SECONDARY } from 'style-constants';
import { NO_AVATAR } from 'utils/constants';

import {
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { getUserAvatar } from 'utils/profileManagement';
import userBodyIconAvatar from 'images/user2.svg?external';

import Dropdown from 'components/common/Dropdown';
import Span from 'components/Span';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import Icon from 'components/Icon/index';
import { getUserName } from 'utils/user';
import { selectIsMenuVisible } from '../AppWrapper/selectors';
import { getPermissions } from 'utils/properties';

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

const B = ({ profileInfo, isMenuVisible, isMobileVersion }) => {
  return (
    <span className="df aic">
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
};

export const Button = connect((state) => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const getOptions = (profileInfo) => {
  const { user } = profileInfo;

  const isModerator = useMemo(
    () => !!getPermissions(profileInfo)?.length,
    [profileInfo],
  );

  return profileDropdownConfig(user, profileInfo, isModerator).filter(
    (option) => Boolean(option),
  );
};

const ProfileDropdown = ({ profileInfo }) => (
  <Dropdown
    options={getOptions(profileInfo)}
    trigger={<Button profileInfo={profileInfo} />}
    appendTo="parent"
    isArrowed
    arrowWidth="18px"
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
