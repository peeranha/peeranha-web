/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { compose } from 'redux';
import * as routes from 'routes-config';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import Ul from 'components/Ul';
import Li from 'components/Li';
import AddText from 'components/AddText';
import A from 'components/A';

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
  border-left: 3px solid rgba(0, 0, 0, 0);
  background-color: ${props =>
    window.location.pathname === props.route
      ? 'rgba(53,74,137,0.11)'
      : 'rgba(0,0,0,0)'};
  border-color: ${props =>
    window.location.pathname === props.route ? '#5065A5' : 'rgba(0,0,0,0)'};
  font-weight: ${props =>
    window.location.pathname === props.route ? 'bold' : 'normal'};

  > a {
    flex: 1;
  }

  .chevron {
    color: ${props =>
      window.location.pathname === props.route ? '#576FED' : '#7B7B7B'};
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
            <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
            <span>My feed</span>
          </A>
        </LiExtended>
      )}
      <LiExtended route={questionsRoute}>
        <A to={questionsRoute} href={questionsRoute}>
          <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
          <span>All questions</span>
        </A>
      </LiExtended>
      <LiExtended route={communitiesRoute}>
        <A to={communitiesRoute} href={communitiesRoute}>
          <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
          <span>Communities</span>
        </A>
      </LiExtended>
      <LiExtended route={tagsRoute}>
        <A to={tagsRoute} href={tagsRoute}>
          <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
          <span>Tags</span>
        </A>
      </LiExtended>
      <LiExtended route={usersRoute}>
        <A to={usersRoute} href={usersRoute}>
          <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
          <span>Users</span>
        </A>
      </LiExtended>
      <LiExtended route={faqRoute}>
        <A to={faqRoute} href={faqRoute}>
          <FontAwesomeIcon className="chevron file-alt" icon="file-alt" />
          <span>FAQ</span>
        </A>
      </LiExtended>
    </Ul>
    <UlMargin>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <AddText color="gray">About</AddText>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <AddText color="gray">Contacts</AddText>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <AddText color="gray">Support</AddText>
        </A>
      </Li>
      <Li>
        <A to={faqRoute} href={faqRoute}>
          <AddText color="gray">Privacy Policy</AddText>
        </A>
      </Li>
    </UlMargin>
    <Footer>
      <AddText
        color="gray"
        fontSize="12"
      >{`@${new Date().getFullYear()} Peerania`}</AddText>
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
