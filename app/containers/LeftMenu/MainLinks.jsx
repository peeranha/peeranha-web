import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  BG_PRIMARY_DARK,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import myFeedIcon from 'images/myFeed.svg?external';
import allQuestionsIcon from 'images/allQuestions.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import questionRoundedIcon from 'images/faq.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import { BasicLink } from './Styles';

const A1 = A.extend`
  ${BasicLink};

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
`;

const MainLinks = ({ profile }) => {
  const { pathname } = window.location;

  return (
    <div>
      {profile && (
        <A1 to={routes.feed()} disabled={pathname === routes.feed()}>
          <Icon width="24" icon={myFeedIcon} />
          <FormattedMessage {...messages.myFeed} />
        </A1>
      )}

      <A1 to={routes.questions()} disabled={pathname === routes.questions()}>
        <Icon width="24" icon={allQuestionsIcon} />
        <FormattedMessage {...messages.allQuestions} />
      </A1>

      <A1
        to={routes.communities()}
        disabled={pathname === routes.communities()}
      >
        <Icon width="24" icon={communitiesIcon} />
        <FormattedMessage {...messages.communities} />
      </A1>

      <A1 to={routes.tags()} disabled={pathname === routes.tags()}>
        <Icon width="24" icon={tagsIcon} />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()} disabled={pathname === routes.users()}>
        <Icon width="24" icon={usersIcon} />
        <FormattedMessage {...messages.users} />
      </A1>

      <A1 to={routes.appFaq()} disabled={pathname === routes.appFaq()}>
        <Icon width="24" icon={questionRoundedIcon} />
        <FormattedMessage {...messages.faq} />
      </A1>
    </div>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
};

export default MainLinks;
