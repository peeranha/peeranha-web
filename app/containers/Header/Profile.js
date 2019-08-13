import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_PRIMARY,
  BG_PRIMARY,
  BORDER_PRIMARY,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import * as routes from 'routes-config';
import logoutIcon from 'images/logout.svg?inline';
import messages from 'common-messages';

import noAvatar from 'images/ico-user-no-photo.png';
import currencyPeerIcon from 'images/currencyPeer.svg?external';

import { getFormattedNum4 } from 'utils/numbers';

import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import MediumImage from 'components/Img/MediumImage';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import Logout from 'containers/Logout';
import SendTokens from 'containers/SendTokens';

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
const ButtonInProfileDropdown = /* istanbul ignore next */ ({
  profileInfo,
  onClick,
}) => (
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

const MenuInProfileDropdown = /* istanbul ignore next */ ({ user }) => (
  <nav>
    <Ul>
      <Li>
        <AStyled to={routes.profileView(user)}>
          <FormattedMessage {...messages.profile} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userQuestions(user)}>
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.userAnswers(user)}>
          <FormattedMessage {...messages.answers} />
        </AStyled>
      </Li>
      <Li>
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

const ButtonInWalletDropdownStyled = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid ${BORDER_PRIMARY};
  border-left: 0px;
  border-radius: 23px;
  padding-right: 25px;

  ${MediumImage} {
    margin-right: 10px;
  }

  :hover {
    ${MediumImage} {
      animation: anim 1s infinite linear;
    }
  }

  @keyframes anim {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const IconBG = MediumImage.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${IconStyled} {
    ${() => IconHover({ color: TEXT_LIGHT })};
  }
`.withComponent('span');

const ButtonInWalletDropdown = () => (
  <ButtonInWalletDropdownStyled>
    <IconBG bg={BG_PRIMARY}>
      <Icon width="24" icon={currencyPeerIcon} noMargin />
    </IconBG>

    <span className="d-flex flex-column text-left">
      <Span bold>${getFormattedNum4(99999.23999)}</Span>
      <Span fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.peers} />
      </Span>
    </span>
  </ButtonInWalletDropdownStyled>
);

const MenuInWalletDropdown = ({ user }) => (
  <Ul>
    <Li>
      <AStyled to={routes.userWallet(user)}>
        <FormattedMessage {...messages.wallet} />
      </AStyled>
    </Li>
    <Li>
      <SendTokens>
        <FormattedMessage {...messages.sendTokens} />
      </SendTokens>
    </Li>
  </Ul>
);

const Profile = /* istanbul ignore next */ ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) =>
  !isMenuVisible ? (
    <React.Fragment>
      <Dropdown
        className={`${isMenuVisible ? 'd-flex' : 'd-none d-md-flex'}`}
        id={`profile_id_${Math.random()}`}
        button={<ButtonInWalletDropdown />}
        menu={<MenuInWalletDropdown user={profileInfo.user} />}
      />
      <Dropdown
        isArrowed
        className={`${isMenuVisible ? 'd-flex' : 'd-none d-md-flex'}`}
        id={`profile_id_${Math.random()}`}
        button={<ButtonInProfileDropdown profileInfo={profileInfo} />}
        menu={<MenuInProfileDropdown user={profileInfo.user} />}
      />
    </React.Fragment>
  ) : (
    <ButtonInProfileDropdown
      profileInfo={profileInfo}
      onClick={expandLeftMenuNavigation}
    />
  );

Profile.propTypes = {
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  expandLeftMenuNavigation: PropTypes.func,
};

MenuInProfileDropdown.propTypes = {
  user: PropTypes.string,
};

ButtonInProfileDropdown.propTypes = {
  profileInfo: PropTypes.object,
  onClick: PropTypes.func,
};

MenuInWalletDropdown.propTypes = {
  user: PropTypes.string,
};

export default React.memo(Profile);
