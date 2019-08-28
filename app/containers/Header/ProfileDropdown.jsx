import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import logoutIcon from 'images/logout.svg?inline';
import messages from 'common-messages';

import Cookies from 'utils/cookies';
import noAvatar from 'images/ico-user-no-photo.png';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import MediumImage from 'components/Img/MediumImage';

import Logout from 'containers/Logout';
import { AUTH_TYPE, LOGIN_WITH_EMAIL } from 'containers/Login/constants';

const Info = styled.span`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const authType = Cookies.get(AUTH_TYPE);

export const AStyled = A.extend`
  display: flex;
  flex: 1;

  ${x => (x.disabled ? `opacity: 0.5` : ``)};
`;

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
const Button = ({ profileInfo, onClick }) => (
  <span className="d-flex" onClick={onClick}>
    <MediumImage
      isBordered
      src={profileInfo.ipfs_avatar || noAvatar}
      alt="ipfs_avatar"
    />
    <Info>
      <Span bold>{profileInfo.display_name}</Span>
      <RatingStatus rating={profileInfo.rating} size="sm" isRankOff />
    </Info>
  </span>
);

const Menu = ({ user, questionsLength, questionsWithUserAnswersLength }) => (
  <nav>
    <Ul>
      <Li>
        <AStyled to={routes.profileView(user)}>
          <FormattedMessage {...messages.profile} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userQuestions(user)} disabled={!questionsLength}>
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled
          to={routes.userAnswers(user)}
          disabled={!questionsWithUserAnswersLength}
        >
          <FormattedMessage {...messages.answers} />
        </AStyled>
      </Li>
      <Li className={authType !== LOGIN_WITH_EMAIL ? 'd-none' : ''}>
        <AStyled to={routes.userSettings(user)}>
          <FormattedMessage {...messages.settings} />
        </AStyled>
      </Li>
    </Ul>

    <Ul className="d-block d-lg-none">
      <Li>
        <AStyled to={routes.feed()}>
          <FormattedMessage {...messages.myFeed} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.questions()}>
          <FormattedMessage {...messages.all} />{' '}
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.communities()}>
          <FormattedMessage {...messages.communities} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.tags()}>
          <FormattedMessage {...messages.tags} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.users()}>
          <FormattedMessage {...messages.users} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...messages.faq} />
        </AStyled>
      </Li>
    </Ul>

    <Ul className="d-block d-lg-none">
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...messages.about} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...messages.contacts} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...messages.support} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...messages.privacyPolicy} />
        </AStyled>
      </Li>
    </Ul>

    <Ul>
      <Li className="d-flex align-items-center">
        <Logout>
          <img className="mr-1" src={logoutIcon} alt="icon" />
          <Span color={TEXT_PRIMARY}>
            <FormattedMessage {...messages.logout} />
          </Span>
        </Logout>
      </Li>
    </Ul>
  </nav>
);

const ProfileDropdown = ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) =>
  !isMenuVisible ? (
    <Dropdown
      isArrowed
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-md-flex'}`}
      id={`profile_id_${Math.random()}`}
      button={<Button profileInfo={profileInfo} />}
      menu={
        <Menu
          user={profileInfo.user}
          questionsLength={profileInfo.questions_asked}
          questionsWithUserAnswersLength={profileInfo.answers_given}
        />
      }
    />
  ) : (
    <Button profileInfo={profileInfo} onClick={expandLeftMenuNavigation} />
  );

ProfileDropdown.propTypes = {
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  expandLeftMenuNavigation: PropTypes.func,
};

Menu.propTypes = {
  user: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
};

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(ProfileDropdown);
