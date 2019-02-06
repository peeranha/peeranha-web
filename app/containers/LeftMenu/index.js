/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { compose } from 'redux';

import * as routes from 'routes-config';
import { darkblue, blue, transparent, black } from 'style-constants';

import myFeedIcon from 'svg/myFeed';
import allQuestionsIcon from 'svg/allQuestions';
import communitiesIcon from 'svg/communities';
import tagsIcon from 'svg/tags';
import usersIcon from 'svg/users';
import faqIcon from 'svg/faq';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import { HEADER_HEIGHT } from 'containers/Header/constants';

import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';

import messages from 'common-messages';

import { LEFT_MENU_ID } from './constants';

const Aside = styled.aside`
  margin-right: 15px;
  margin-top: 15px;
  flex-basis: ${LEFT_MENU_WIDTH}px;
`;

/* eslint-disable */
const LiExtended = Li.extend`
  display: flex;
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

const FixedContent = styled.div`
  position: fixed;
  transition: 0.4s;

  &.scroll-hidden {
    top: 0px;
  }

  &.scroll-visible {
    top: ${HEADER_HEIGHT}px;
  }
`;

const feedRoute = routes.feed();
const questionsRoute = routes.questions();
const communitiesRoute = routes.communities();
const tagsRoute = routes.tags();
const usersRoute = routes.users();
const faqRoute = routes.faq();

const LeftMenu = props => (
  <Aside className="d-none d-lg-block">
    <FixedContent id={LEFT_MENU_ID}>
      <Ul>
        {props.profile && (
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
          <A to={faqRoute} href={faqRoute}>
            <Icon icon={faqIcon} />
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
    </FixedContent>
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(LeftMenu);
