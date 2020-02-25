/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import logoutIcon from 'images/logout.svg?inline';

import { getUserAvatar } from 'utils/profileManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import Dropdown from 'components/Dropdown';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';

import Logout from 'containers/Logout';

const single = isSingleCommunityWebsite();

const Info = styled.span`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = ({ profileInfo, onClick }) => (
  <span className={`d-flex ${single ? 'ml-3' : ''}`} onClick={onClick}>
    {single ? (
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
    <Info>
      <Span bold>{profileInfo.display_name}</Span>
      {!single ? (
        <RatingStatus rating={profileInfo.rating} size="sm" isRankOff />
      ) : null}
    </Info>
  </span>
);

const Menu = ({
  profileInfo: { user, rating },
  questionsLength,
  questionsWithUserAnswersLength,
}) => (
  <nav>
    <Ul>
      <A to={routes.profileView(user)}>
        <FormattedMessage {...messages.profile} />
        {single ? (
          <div className="ml-2">
            <RatingStatus rating={rating} size="sm" isRankOff />
          </div>
        ) : null}
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

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(ProfileDropdown);
