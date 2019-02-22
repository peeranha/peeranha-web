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

import messages from 'common-messages';

import * as routes from 'routes-config';
import { darkblue, blue, transparent, black } from 'style-constants';

import myFeedIcon from 'svg/myFeed';
import allQuestionsIcon from 'svg/allQuestions';
import communitiesIcon from 'svg/communities';
import tagsIcon from 'svg/tags';
import usersIcon from 'svg/users';
import logoutIcon from 'svg/logout';
import questionRoundedIcon from 'svg/faq';

import { LEFT_MENU_ID } from './constants';

const feedRoute = routes.feed();
const questionsRoute = routes.questions();
const communitiesRoute = routes.communities();
const tagsRoute = routes.tags();
const usersRoute = routes.users();
const faqRoute = routes.faq();

/* eslint-disable */
/* istanbul ignore next */
const LiExtended = Li.extend`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-left: 3px solid ${transparent};
  background-color: ${props =>
    window.location.pathname === props.route
      ? 'rgba(53,74,137,0.11)'
      : transparent};
  border-color: ${props =>
    window.location.pathname === props.route ? darkblue : transparent};
  font-weight: ${props =>
    window.location.pathname === props.route ? 'bold' : 'normal'};

  > a {
    flex: 1;
  }

  span[data-icon='icon'] {
    stroke: ${props =>
      window.location.pathname === props.route ? blue : black};
  }
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
const FixedContentStyled = styled.div`
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
            <A to={routes.profile_view(profile.user)}>
              <FormattedMessage {...messages.profile} />
            </A>
          </LiExtended>
          <LiExtended>
            <A to={routes.user_questions(profile.user)}>
              <FormattedMessage {...messages.questions} />
            </A>
          </LiExtended>
          <LiExtended>
            <A to={routes.user_answers(profile.user)}>
              <FormattedMessage {...messages.answers} />
            </A>
          </LiExtended>
          <LiExtended>
            <A to={routes.user_settings(profile.user)}>
              <FormattedMessage {...messages.settings} />
            </A>
          </LiExtended>
          <LiExtended>
            <Icon icon={logoutIcon} />
            <Span color="blue">
              <FormattedMessage {...messages.logout} />
            </Span>
          </LiExtended>
        </Ul>
      )}

    <Ul>
      {profile && (
        <LiExtended route={feedRoute}>
          <A to={feedRoute} href={feedRoute}>
            <Icon icon={myFeedIcon} />
            <FormattedMessage {...messages.myFeed} />
          </A>
        </LiExtended>
      )}
      <LiExtended route={questionsRoute}>
        <A to={questionsRoute} href={questionsRoute}>
          <Icon icon={allQuestionsIcon} />
          <FormattedMessage {...messages.all} />{' '}
          <FormattedMessage {...messages.questions} />
        </A>
      </LiExtended>
      <LiExtended route={communitiesRoute}>
        <A to={communitiesRoute} href={communitiesRoute}>
          <Icon icon={communitiesIcon} />
          <FormattedMessage {...messages.communities} />
        </A>
      </LiExtended>
      <LiExtended route={tagsRoute}>
        <A to={tagsRoute} href={tagsRoute}>
          <Icon icon={tagsIcon} />
          <FormattedMessage {...messages.tags} />
        </A>
      </LiExtended>
      <LiExtended route={usersRoute}>
        <A to={usersRoute} href={usersRoute}>
          <Icon icon={usersIcon} />
          <FormattedMessage {...messages.users} />
        </A>
      </LiExtended>
      <LiExtended route={faqRoute}>
        <A className="d-flex align-items-center" to={faqRoute} href={faqRoute}>
          <Icon icon={questionRoundedIcon} />
          <FormattedMessage {...messages.faq} />
        </A>
      </LiExtended>
    </Ul>

    <UlMargin>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">
            <FormattedMessage {...messages.about} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">
            <FormattedMessage {...messages.contacts} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">
            <FormattedMessage {...messages.support} />
          </Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">
            <FormattedMessage {...messages.privacyPolicy} />
          </Span>
        </A>
      </Li>
    </UlMargin>

    <Footer>
      <Span color="gray" fontSize="12">
        <span>{`@${new Date().getFullYear()} `}</span>
        <FormattedMessage {...messages.peerania} />
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
