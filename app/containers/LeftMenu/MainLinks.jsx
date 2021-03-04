/* eslint indent: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import isMobile from 'ismobilejs';

import {
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  PRIMARY_SPECIAL,
  TEXT_DARK,
  APP_FONT,
  BORDER_PRIMARY,
  BORDER_DARK,
  ICON_TRASPARENT_BLUE,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
  singleCommunityFonts,
  getSingleCommunityDetails,
} from 'utils/communityManagement';

import homeIcon from 'images/house.svg?external';
import myFeedIcon from 'images/myFeed.svg?external';
import allQuestionsIcon from 'images/allQuestions.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import faqIcon from 'images/faq.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';

import A from 'components/A';
import { IconLg } from 'components/Icon/IconWithSizes';
import { svgDraw } from 'components/Icon/IconStyled';

import { BasicLink } from './Styles';
import { FULL_SIZE } from './constants';

const styles = singleCommunityStyles();
const colors = singleCommunityColors();
const fonts = singleCommunityFonts();

const A1 = A.extend`
  ${BasicLink};

  letter-spacing: 0 !important;

  ${({ route, name }) =>
    route === name
      ? `
    background-color: ${PRIMARY_SPECIAL};
    border-color: ${BORDER_PRIMARY_DARK};
    font-family: ${fonts.mainLinksSelected || APP_FONT};
    letter-spacing: 0.5px;
    font-weight: bold;
    color: ${colors.mainLinks ? colors.mainLinks : TEXT_DARK} !important;
    .fill {
      fill: ${BORDER_PRIMARY};
    }
    .semitransparent{
      fill: ${ICON_TRASPARENT_BLUE}
    }
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
    .fill {
      fill: ${BORDER_DARK};
    }
    .semitransparent {
      fill: none;
    }  
    :hover {
      .fill {
        fill: ${BORDER_PRIMARY};
      }
    }
  `};
`;

const Box = styled.div`
  margin-bottom: ${({ currClientHeight }) => {
    if (styles.withoutAdditionalLinks) return '0px !important';
    if (currClientHeight < FULL_SIZE && !isMobile(window.navigator).any)
      return '25px !important';
    return '50px';
  }};
  padding-bottom: 25px;
  @media only screen and (max-width: 576px) {
    padding: 10px 0 20px 0;
  }
`;

const MainLinks = ({ profile, currClientHeight }) => {
  const { pathname } = window.location;
  let route = pathname.split('/').filter(x => x)[0];

  const singleCommId = +isSingleCommunityWebsite();
  const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

  if (!route) {
    route = isBloggerMode ? 'home' : 'questions';
  }

  return (
    <Box currClientHeight={currClientHeight}>
      {isBloggerMode && (
        <A1 to={routes.detailsHomePage()} name="home" route={route}>
          <IconLg className="mr-2" icon={homeIcon} />
          <FormattedMessage {...messages.home} />
        </A1>
      )}
        
      {!singleCommId &&
        profile && (
          <A1 to={routes.feed()} name="feed" route={route}>
            <IconLg className="mr-2" icon={myFeedIcon} />
            <FormattedMessage {...messages.myFeed} />
          </A1>
        )}

      <A1 to={routes.questions()} name="questions" route={route}>
        <IconLg className="mr-2" icon={allQuestionsIcon} />
        <FormattedMessage {...messages.questions} />
      </A1>

      {!singleCommId && (
        <A1 to={routes.communities()} name="communities" route={route}>
          <IconLg className="mr-2" icon={communitiesIcon} />
          <FormattedMessage {...messages.communities} />
        </A1>
      )}

      <A1
        to={!singleCommId ? routes.tags() : routes.communityTags(singleCommId)}
        name="tags"
        route={route}
      >
        <IconLg className="mr-2" icon={tagsIcon} />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()} name="users" route={route}>
        <IconLg className="mr-2" icon={usersIcon} />
        <FormattedMessage
          {...messages[isBloggerMode ? 'followers' : 'users']}
        />
      </A1>

      {!styles.withoutFAQ && (
        <A1 to={routes.faq()} name="faq" route={route}>
          <IconLg className="mr-2" icon={faqIcon} fill={BORDER_PRIMARY} />
          <FormattedMessage {...messages.faq} />
        </A1>
      )}

      {!singleCommId && (
        <A1 to={routes.tutorial()} name="tutorial" route={route}>
          <IconLg className="mr-2" icon={tutorialIcon} fill={BORDER_PRIMARY} />
          <FormattedMessage {...messages.tutorial} />
        </A1>
      )}
    </Box>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
  currClientHeight: PropTypes.number,
};

export default MainLinks;
