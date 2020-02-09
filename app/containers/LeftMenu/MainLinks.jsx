/* eslint indent: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  PRIMARY_SPECIAL,
  TEXT_DARK,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import myFeedIcon from 'images/myFeed.svg?external';
import allQuestionsIcon from 'images/allQuestions.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import faqIcon from 'images/faq.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { svgDraw } from 'components/Icon/IconStyled';

import { BasicLink } from './Styles';

const A1 = A.extend`
  ${BasicLink};

  ${({ routeKey, name }) =>
    routeKey === name
      ? `
    background-color: ${PRIMARY_SPECIAL};
    border-color: ${BORDER_PRIMARY_DARK};
    font-weight: bold;
    color: ${TEXT_DARK} !important;

    ${svgDraw({ color: TEXT_PRIMARY })};
  `
      : `
    background-color: ${BG_TRANSPARENT};
    border-color: ${BORDER_TRANSPARENT};
    font-weight: normal;

    .opacity {
      fill: none !important;
    }
  `};
`;

const Box = styled.div`
  @media only screen and (max-width: 576px) {
    padding: 10px 0 20px 0;
  }
`;

const singleCommId = isSingleCommunityWebsite();

const MainLinks = ({ profile }) => {
  const { pathname } = window.location;
  const routeKey = pathname.split('/').filter(x => x)[0];

  return (
    <Box>
      {!isSingleCommunityWebsite() &&
        profile && (
          <A1 to={routes.feed()} name="feed" routeKey={routeKey}>
            <Icon className="mr-2" width="24" icon={myFeedIcon} />
            <FormattedMessage {...messages.myFeed} />
          </A1>
        )}

      <A1
        to={routes.questions()}
        name="questions"
        routeKey={routeKey || 'questions'}
      >
        <Icon className="mr-2" width="24" icon={allQuestionsIcon} />
        <FormattedMessage {...messages.questions} />
      </A1>

      {!singleCommId && (
        <A1 to={routes.communities()} name="communities" routeKey={routeKey}>
          <Icon className="mr-2" width="24" icon={communitiesIcon} />
          <FormattedMessage {...messages.communities} />
        </A1>
      )}

      <A1
        to={!singleCommId ? routes.tags() : routes.communityTags(singleCommId)}
        name="tags"
        routeKey={routeKey}
      >
        <Icon className="mr-2" width="24" icon={tagsIcon} />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()} name="users" routeKey={routeKey}>
        <Icon className="mr-2" width="24" icon={usersIcon} />
        <FormattedMessage {...messages.users} />
      </A1>

      <A1 to={routes.faq()} name="faq" routeKey={routeKey}>
        <Icon className="mr-2" width="24" icon={faqIcon} />
        <FormattedMessage {...messages.faq} />
      </A1>
    </Box>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
};

export default MainLinks;
