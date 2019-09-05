import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import {
  TEXT_SECONDARY,
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  BORDER_SECONDARY,
  BG_PRIMARY_DARK,
} from 'style-constants';

import { getQuestionCode } from 'utils/privacyPolicyManagement';

import myFeedIcon from 'images/myFeed.svg?external';
import allQuestionsIcon from 'images/allQuestions.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import logoutIcon from 'images/logout.svg?inline';
import questionRoundedIcon from 'images/faq.svg?external';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import { HEADER_HEIGHT } from 'containers/Header/constants';

import Li from 'components/Li';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import Logout from 'containers/Logout';
import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';

import { LEFT_MENU_ID } from './constants';

export const ABase = Li.extend`
  display: block;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-left: 3px solid ${BORDER_TRANSPARENT};

  :hover {
    color: ${TEXT_PRIMARY};

    ${IconStyled} {
      ${IconHover({ color: TEXT_PRIMARY })};
    }
  }
`;

/* eslint-disable */
/* istanbul ignore next */
export const A1 = ABase.extend`
  ${({ to }) =>
    window.location.pathname
      .split('/')
      .filter(x => x.length > 0)[0]
      .match(to.split('/').filter(x => x.length > 0)[0])
      ? `
    background-color: ${BG_PRIMARY_DARK}25;
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
`.withComponent(A);
/* eslint-enable */

/* istanbul ignore next */
export const FixedContentStyled = styled.nav`
  position: ${x => (x.isMenuVisible ? 'relative' : 'fixed')};
  width: ${x => (x.isMenuVisible ? '100%' : `${LEFT_MENU_WIDTH}px`)};
  transition: 0.4s;

  &.scroll-hidden {
    top: 0px;
  }

  &.scroll-visible {
    top: ${HEADER_HEIGHT}px;
  }

  div {
    padding: 16px 0;
    margin-bottom: 20px;
  }

  > div:not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

export const A2 = A.extend`
  padding: 6px 15px;
  color: ${TEXT_SECONDARY};
`.withComponent(A);

/* eslint indent: 0 */
const FixedContent = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  isNavigationExpanded,
}) => (
  <FixedContentStyled id={LEFT_MENU_ID} isMenuVisible={isMenuVisible}>
    {profile &&
      isNavigationExpanded && (
        <div>
          <A1 to={routes.profileView(profile.user)}>
            <FormattedMessage {...messages.profile} />
          </A1>

          <A1 to={routes.userQuestions(profile.user)}>
            <FormattedMessage {...messages.questions} />
          </A1>

          <A1 to={routes.userAnswers(profile.user)}>
            <FormattedMessage {...messages.answers} />
          </A1>

          <A1 to={routes.userSettings(profile.user)}>
            <FormattedMessage {...messages.settings} />
          </A1>

          <A1 className="d-flex align-items-center">
            <Logout>
              <img className="mr-1" src={logoutIcon} alt="icon" />
              <Span color={TEXT_PRIMARY}>
                <FormattedMessage {...messages.logout} />
              </Span>
            </Logout>
          </A1>
        </div>
      )}

    <div>
      {profile && (
        <A1 to={routes.feed()}>
          <Icon width="24" icon={myFeedIcon} />
          <FormattedMessage {...messages.myFeed} />
        </A1>
      )}

      <A1 to={routes.questions()}>
        <Icon width="24" icon={allQuestionsIcon} />
        <FormattedMessage {...messages.allQuestions} />
      </A1>

      <A1 to={routes.communities()}>
        <Icon width="24" icon={communitiesIcon} />
        <FormattedMessage {...messages.communities} />
      </A1>

      <A1 to={routes.tags()}>
        <Icon width="24" icon={tagsIcon} />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()}>
        <Icon width="24" icon={usersIcon} />
        <FormattedMessage {...messages.users} />
      </A1>

      <A1 to={routes.appFaq()}>
        <Icon width="24" icon={questionRoundedIcon} />
        <FormattedMessage {...messages.faq} />
      </A1>
    </div>

    <div className="d-flex flex-column">
      <A2 to={routes.home()}>
        <FormattedMessage {...messages.about} />
      </A2>

      <A2 to={routes.support(CONTACTS_ID)}>
        <FormattedMessage {...messages.contacts} />
      </A2>

      <A2 to={routes.support(FORM_ID)}>
        <FormattedMessage {...messages.support} />
      </A2>

      <A2 to={routes.privacyPolicy(getQuestionCode())}>
        <FormattedMessage {...messages.privacyPolicy} />
      </A2>

      <A2 className="my-2" to={routes.home()}>
        <Span color={TEXT_SECONDARY} fontSize="12">
          <span>@{new Date().getFullYear()}</span>{' '}
          <FormattedMessage {...messages.peeranha} />
        </Span>
      </A2>
    </div>
  </FixedContentStyled>
);

FixedContent.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  isNavigationExpanded: PropTypes.bool,
};

export default React.memo(FixedContent);
