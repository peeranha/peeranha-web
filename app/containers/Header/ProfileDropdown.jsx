import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import logoutIcon from 'images/logout.svg?inline';

import { getUserAvatar } from 'utils/profileManagement';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import { MediumSpecialImage } from 'components/Img/MediumImage';

import Logout from 'containers/Logout';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

const Info = styled.span`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AStyled = A.extend`
  display: flex;
  flex: 1;

  ${x => (x.disabled ? `opacity: 0.5` : ``)};
`;

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
export const Button = ({ profileInfo, onClick }) => (
  <span className="d-flex" onClick={onClick}>
    <MediumSpecialImage
      isBordered
      src={getUserAvatar(profileInfo.ipfs_avatar)}
      alt="ipfs_avatar"
    />
    <Info>
      <Span bold>{profileInfo.display_name}</Span>
      <RatingStatus rating={profileInfo.rating} size="sm" isRankOff />
    </Info>
  </span>
);

const Menu = ({
  user,
  questionsLength,
  questionsWithUserAnswersLength,
  loginWithScatter,
}) => (
  <nav>
    <Ul>
      <Li>
        <AStyled to={routes.profileView(user)}>
          <FormattedMessage {...messages.profile} />
        </AStyled>
      </Li>
      <Li>
        <AStyled
          to={routes.userQuestions(user)}
          disabled={!questionsLength}
          tabIndex={!questionsLength ? '-1' : undefined}
        >
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled
          to={routes.userAnswers(user)}
          disabled={!questionsWithUserAnswersLength}
          tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
        >
          <FormattedMessage {...messages.answers} />
        </AStyled>
      </Li>
      <Li className={loginWithScatter ? 'd-none' : ''}>
        <AStyled to={routes.userSettings(user)}>
          <FormattedMessage {...messages.settings} />
        </AStyled>
      </Li>
    </Ul>

    <Ul className="d-none">
      <Li>
        <AStyled to={routes.feed()}>
          <FormattedMessage {...messages.myFeed} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.questions()}>
          <FormattedMessage {...messages.allQuestions} />
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

    <Ul className="d-none">
      <Li>
        <AStyled to={routes.home()}>
          <FormattedMessage {...messages.about} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.support(CONTACTS_ID)}>
          <FormattedMessage {...messages.contacts} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.support(FORM_ID)}>
          <FormattedMessage {...messages.support} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.privacyPolicy()}>
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

const ProfileDropdown = ({ profileInfo }) => (
  <Dropdown
    isArrowed
    className="d-none d-md-flex"
    id="profile_dropdown_id"
    button={<Button profileInfo={profileInfo} />}
    menu={
      <Menu
        user={profileInfo.user}
        questionsLength={profileInfo.questions_asked}
        questionsWithUserAnswersLength={profileInfo.answers_given}
        loginWithScatter={profileInfo.loginData.loginWithScatter}
      />
    }
  />
);

ProfileDropdown.propTypes = {
  profileInfo: PropTypes.object,
};

Menu.propTypes = {
  user: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
  loginWithScatter: PropTypes.bool,
};

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(ProfileDropdown);
