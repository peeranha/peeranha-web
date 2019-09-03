import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import { HEADER_HEIGHT } from 'containers/Header/constants';

import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import messages from 'common-messages';

import * as routes from 'routes-config';

import {
  TEXT_SECONDARY,
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
} from 'style-constants';

import myFeedIcon from 'images/myFeed.svg?external';
import allQuestionsIcon from 'images/allQuestions.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import logoutIcon from 'images/logout.svg?inline';
import questionRoundedIcon from 'images/faq.svg?external';

import Logout from 'containers/Logout';

import { LEFT_MENU_ID } from './constants';

const feedRoute = routes.feed();
const questionsRoute = routes.questions();
const communitiesRoute = routes.communities();
const tagsRoute = routes.tags();
const usersRoute = routes.users();
const faqRoute = routes.appFaq();

/* eslint-disable */
/* istanbul ignore next */
const LiExtended = Li.extend`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-left: 3px solid ${BORDER_TRANSPARENT};

  > a {
    flex: 1;
  }

  :hover {
    color: ${TEXT_PRIMARY};

    ${IconStyled} {
      ${IconHover({ color: TEXT_PRIMARY })};
    }
  }

  ${({ route }) =>
    window.location.pathname
      .split('/')
      .filter(x => x.length > 0)[0]
      .match(route.split('/').filter(x => x.length > 0)[0])
      ? `
    background-color: rgba(53,74,137,0.11);
    border-color: ${BORDER_PRIMARY_DARK};
    font-weight: bold;

    ${IconStyled} {
      ${IconHover({ color: TEXT_PRIMARY })}
    }
  `
      : `
    background-color: ${BG_TRANSPARENT};
    border-color: ${BORDER_TRANSPARENT};
    font-weight: normal;
  `};
`;
/* eslint-enable */

const UlMargin = Ul.extend`
  margin-top: 30px;
  margin-bottom: 10px;
  border-bottom: none;
`;

const Footer = Li.extend`
  padding: 0 15px;
`.withComponent('footer');

/* istanbul ignore next */
const FixedContentStyled = styled.nav`
  position: ${props => (props.isMenuVisible ? 'relative' : 'fixed')};
  width: ${props => (props.isMenuVisible ? '100%' : `${LEFT_MENU_WIDTH}px`)};
  transition: 0.4s;

  &.scroll-hidden {
    top: 0px;
  }

  &.scroll-visible {
    top: ${HEADER_HEIGHT}px;
  }
`;

/* eslint indent: 0 */
const FixedContent = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  isNavigationExpanded,
}) => (
  <FixedContentStyled id={LEFT_MENU_ID} isMenuVisible={isMenuVisible}>
    {profile &&
      isNavigationExpanded && (
        <Ul>
          <LiExtended>
            <A to={routes.profileView(profile.user)}>
              <FormattedMessage {...messages.profile} />
            </A>
          </LiExtended>

          <LiExtended>
            <A to={routes.userQuestions(profile.user)}>
              <FormattedMessage {...messages.questions} />
            </A>
          </LiExtended>

          <LiExtended>
            <A to={routes.userAnswers(profile.user)}>
              <FormattedMessage {...messages.answers} />
            </A>
          </LiExtended>

          <LiExtended>
            <A to={routes.userSettings(profile.user)}>
              <FormattedMessage {...messages.settings} />
            </A>
          </LiExtended>

          <LiExtended className="d-flex align-items-center">
            <Logout>
              <img className="mr-1" src={logoutIcon} alt="icon" />
              <Span color={TEXT_PRIMARY}>
                <FormattedMessage {...messages.logout} />
              </Span>
            </Logout>
          </LiExtended>
        </Ul>
      )}

    <Ul>
      {profile && (
        <LiExtended route={feedRoute}>
          <A to={feedRoute} href={feedRoute}>
            <Icon width="24" icon={myFeedIcon} />
            <FormattedMessage {...messages.myFeed} />
          </A>
        </LiExtended>
      )}
      <LiExtended route={questionsRoute}>
        <A to={questionsRoute} href={questionsRoute}>
          <Icon width="24" icon={allQuestionsIcon} />
          <FormattedMessage {...messages.allQuestions} />
        </A>
      </LiExtended>

      <LiExtended route={communitiesRoute}>
        <A to={communitiesRoute} href={communitiesRoute}>
          <Icon width="24" icon={communitiesIcon} />
          <FormattedMessage {...messages.communities} />
        </A>
      </LiExtended>

      <LiExtended route={tagsRoute}>
        <A to={tagsRoute} href={tagsRoute}>
          <Icon width="24" icon={tagsIcon} />
          <FormattedMessage {...messages.tags} />
        </A>
      </LiExtended>

      <LiExtended route={usersRoute}>
        <A to={usersRoute} href={usersRoute}>
          <Icon width="24" icon={usersIcon} />
          <FormattedMessage {...messages.users} />
        </A>
      </LiExtended>

      <LiExtended route={faqRoute}>
        <A className="d-flex align-items-center" to={faqRoute} href={faqRoute}>
          <Icon width="24" icon={questionRoundedIcon} />
          <FormattedMessage {...messages.faq} />
        </A>
      </LiExtended>
    </Ul>

    <UlMargin>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color={TEXT_SECONDARY}>
            <FormattedMessage {...messages.about} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color={TEXT_SECONDARY}>
            <FormattedMessage {...messages.contacts} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color={TEXT_SECONDARY}>
            <FormattedMessage {...messages.support} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color={TEXT_SECONDARY}>
            <FormattedMessage {...messages.privacyPolicy} />
          </Span>
        </A>
      </Li>
    </UlMargin>

    <Footer>
      <Span color={TEXT_SECONDARY} fontSize="12">
        <span>{`@${new Date().getFullYear()} `}</span>
        <FormattedMessage {...messages.peeranha} />
      </Span>
    </Footer>
  </FixedContentStyled>
);

FixedContent.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  isNavigationExpanded: PropTypes.bool,
};

export default FixedContent;
