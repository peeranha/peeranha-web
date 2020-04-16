/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import logoutIcon from 'images/logout.svg?inline';

import { getUserAvatar } from 'utils/profileManagement';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import Dropdown from 'components/Dropdown';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';

import Logout from 'containers/Logout';
import { selectIsMenuVisible } from '../AppWrapper/selectors';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

const Info = styled.span`
  padding: 0 10px;
  display: flex;
  flex-direction: ${({ isMenuVisible }) =>
    !styles.withoutSubHeader && !isMenuVisible ? 'row' : 'column'};
  justify-content: center;
  > span:nth-child(1) {
    display: flex;
    align-items: ${x => (x.isMenuVisible ? 'stretch' : 'center')};
    margin-right: ${x => (single && !x.isMenuVisible ? 7 : 'auto')}px;
  }
`;

const B = ({ profileInfo, onClick, isMenuVisible }) => (
  <span className="d-flex" onClick={onClick}>
    {!styles.withoutSubHeader ? (
      <SmallSpecialImage
        isBordered
        src={getUserAvatar(profileInfo.ipfs_avatar)}
        alt="ipfs_avatar"
      />
    ) : (
      <MediumSpecialImage
        isBordered
        src={getUserAvatar(profileInfo.ipfs_avatar)}
        alt="ipfs_avatar"
      />
    )}
    <Info isMenuVisible={isMenuVisible}>
      <Span className={single ? 'align-middle' : ''} bold>
        {profileInfo.display_name}
      </Span>
      <RatingStatus rating={profileInfo.rating} size="sm" isRankOff />
    </Info>
  </span>
);

export const Button = connect(state => ({
  isMenuVisible: selectIsMenuVisible()(state),
}))(B);

const Menu = ({
  profileInfo: { user },
  questionsLength,
  questionsWithUserAnswersLength,
}) => (
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
    </Ul>

    <Ul>
      <Logout>
        <img className="mr-1" src={logoutIcon} alt="icon" />
        <Span color={TEXT_PRIMARY}>
          <FormattedMessage {...messages.logout} />
        </Span>
      </Logout>
    </Ul>
  </nav>
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
};

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(ProfileDropdown);
