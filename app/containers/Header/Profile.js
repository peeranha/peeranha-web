import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import logoutIcon from 'svg/logout';
import messages from 'common-messages';

import noAvatar from 'images/ico-user-no-photo.png';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';
import RatingStatus from 'components/RatingStatus';
import MediumImage from 'components/Img/MediumImage';

const Info = styled.span`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AStyled = A.extend`
  display: flex;
  flex: 1;
`;

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
const Button = /* istanbul ignore next */ ({ profileInfo, onClick }) => (
  <span className="d-flex" onClick={onClick}>
    <MediumImage
      isBordered
      src={profileInfo.ipfs_avatar || noAvatar}
      alt="ipfs_avatar"
    />
    <Info>
      <Span bold>{profileInfo.display_name}</Span>
      <RatingStatus rating={profileInfo.rating} size="sm" />
    </Info>
  </span>
);

const Menu = /* istanbul ignore next */ ({ profileInfo }) => (
  <div>
    <Ul>
      <Li>
        <AStyled to={routes.profileView(profileInfo.user)}>
          <FormattedMessage {...messages.profile} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userQuestions(profileInfo.user)}>
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userAnswers(profileInfo.user)}>
          <FormattedMessage {...messages.answers} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userSettings(profileInfo.user)}>
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
      <Li>
        <Icon icon={logoutIcon} />
        <Span color={TEXT_PRIMARY}>
          <FormattedMessage {...messages.logout} />
        </Span>
      </Li>
    </Ul>
  </div>
);

const Profile = /* istanbul ignore next */ ({
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
      menu={<Menu profileInfo={profileInfo} />}
    />
  ) : (
    <Button profileInfo={profileInfo} onClick={expandLeftMenuNavigation} />
  );

Profile.propTypes = {
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  expandLeftMenuNavigation: PropTypes.func,
};

Menu.propTypes = {
  profileInfo: PropTypes.object,
};

Button.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(Profile);
