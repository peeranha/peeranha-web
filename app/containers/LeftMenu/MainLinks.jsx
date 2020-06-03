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
  APP_FONT,
  BORDER_PRIMARY,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
  singleCommunityFonts,
} from 'utils/communityManagement';

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

const styles = singleCommunityStyles();
const colors = singleCommunityColors();
const fonts = singleCommunityFonts();

const A1 = A.extend`
  ${BasicLink};

  ${({ route, name }) =>
    route === name
      ? `
    background-color: ${PRIMARY_SPECIAL};
    border-color: ${BORDER_PRIMARY_DARK};
    font-family: ${fonts.mainLinksSelected || APP_FONT};
    letter-spacing: 0.5px;
    font-weight: bold;
    color: ${colors.mainLinks ? colors.mainLinks : TEXT_DARK} !important;
    :hover {
      color: ${colors.mainLinks};
    }
    ${svgDraw({ color: TEXT_PRIMARY })};
  `
      : `
    background-color: ${BG_TRANSPARENT};
    border-color: ${BORDER_TRANSPARENT};
    font-weight: normal;
    font-family: ${fonts.mainLinksNotSelected || APP_FONT};
    .opacity {
      fill: none !important;
    }
  `};
`;

const Box = styled.div`
  margin-bottom: ${styles.withoutAdditionalLinks ? 0 : 50}px;
  padding-bottom: 25px;
  @media only screen and (max-width: 576px) {
    padding: 10px 0 20px 0;
  }
`;

const MainLinks = ({ profile }) => {
  const { pathname } = window.location;
  const route = pathname.split('/').filter(x => x)[0];
  const singleCommId = +isSingleCommunityWebsite();

  return (
    <Box>
      {!singleCommId &&
        profile && (
          <A1 to={routes.feed()} name="feed" route={route}>
            <Icon className="mr-2" width="24" icon={myFeedIcon} />
            <FormattedMessage {...messages.myFeed} />
          </A1>
        )}

      <A1 to={routes.questions()} name="questions" route={route || 'questions'}>
        <Icon className="mr-2" width="24" icon={allQuestionsIcon} />
        <FormattedMessage {...messages.questions} />
      </A1>

      {!singleCommId && (
        <A1 to={routes.communities()} name="communities" route={route}>
          <Icon className="mr-2" width="24" icon={communitiesIcon} />
          <FormattedMessage {...messages.communities} />
        </A1>
      )}

      <A1
        to={!singleCommId ? routes.tags() : routes.communityTags(singleCommId)}
        name="tags"
        route={route}
      >
        <Icon className="mr-2" width="24" icon={tagsIcon} />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()} name="users" route={route}>
        <Icon className="mr-2" width="24" icon={usersIcon} />
        <FormattedMessage {...messages.users} />
      </A1>

      {!styles.withoutFAQ && (
        <A1 to={routes.faq()} name="faq" route={route}>
          <Icon className="mr-2" width="24" icon={faqIcon} fill={BORDER_PRIMARY} />
          <FormattedMessage {...messages.faq} />
        </A1>
      )}
    </Box>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
};

export default MainLinks;
