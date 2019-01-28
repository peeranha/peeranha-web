/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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

import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';

const Aside = styled.aside`
  margin-right: 15px;
  margin-top: 15px;
  flex-basis: 210px;
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
    window.location.pathname === props.route ? darkblue : transparent}};
  font-weight: ${props =>
    window.location.pathname === props.route ? 'bold' : 'normal'};

  > a {
    flex: 1;
  }

  span[data-icon="icon"] {
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

const Footer = Li.extend``.withComponent('footer');

const feedRoute = routes.feed();
const questionsRoute = routes.questions();
const communitiesRoute = routes.communities();
const tagsRoute = routes.tags();
const usersRoute = routes.users();
const faqRoute = routes.faq();

// TODO: change hardcoded textTODO: change hardcoded text when Profile comp. will be finished

const LeftMenu = props => (
  <Aside>
    <Ul>
      {props.profile && (
        <LiExtended route={feedRoute}>
          <A to={feedRoute} href={feedRoute}>
            <Icon icon={myFeedIcon} />
            <span>My feed</span>
          </A>
        </LiExtended>
      )}
      <LiExtended route={questionsRoute}>
        <A to={questionsRoute} href={questionsRoute}>
          <Icon icon={allQuestionsIcon} />
          <span>All questions</span>
        </A>
      </LiExtended>
      <LiExtended route={communitiesRoute}>
        <A to={communitiesRoute} href={communitiesRoute}>
          <Icon icon={communitiesIcon} />
          <span>Communities</span>
        </A>
      </LiExtended>
      <LiExtended route={tagsRoute}>
        <A to={tagsRoute} href={tagsRoute}>
          <Icon icon={tagsIcon} />
          <span>Tags</span>
        </A>
      </LiExtended>
      <LiExtended route={usersRoute}>
        <A to={usersRoute} href={usersRoute}>
          <Icon icon={usersIcon} />
          <span>Users</span>
        </A>
      </LiExtended>
      <LiExtended route={faqRoute}>
        <A to={faqRoute} href={faqRoute}>
          <Icon icon={faqIcon} />
          <span>FAQ</span>
        </A>
      </LiExtended>
    </Ul>
    <UlMargin>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">About</Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">Contacts</Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">Support</Span>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <Span color="gray">Privacy Policy</Span>
        </A>
      </Li>
    </UlMargin>
    <Footer>
      <Span
        color="gray"
        fontSize="12"
      >{`@${new Date().getFullYear()} Peerania`}</Span>
    </Footer>
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
