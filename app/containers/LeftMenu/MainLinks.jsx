import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  PRIMARY_SPECIAL,
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

import { BasicLink } from './Styles';

const A1 = A.extend`
  ${BasicLink};

  ${({ to }) =>
    window.location.pathname === to
      ? `
    background-color: ${PRIMARY_SPECIAL};
    border-color: ${BORDER_PRIMARY_DARK};
    font-weight: bold;
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
          <Icon
            className="mr-2"
            width="24"
            icon={myFeedIcon}
            color={pathname === routes.feed() && TEXT_PRIMARY}
          />
          <FormattedMessage {...messages.myFeed} />
        </A1>
      )}

      <A1 to={routes.questions()} disabled={pathname === routes.questions()}>
        <Icon
          className="mr-2"
          width="24"
          icon={allQuestionsIcon}
          color={pathname === routes.questions() && TEXT_PRIMARY}
        />
        <FormattedMessage {...messages.allQuestions} />
      </A1>

      <A1
        to={routes.communities()}
        disabled={pathname === routes.communities()}
      >
        <Icon
          className="mr-2"
          width="24"
          icon={communitiesIcon}
          color={pathname === routes.communities() && TEXT_PRIMARY}
        />
        <FormattedMessage {...messages.communities} />
      </A1>

      <A1 to={routes.tags()} disabled={pathname === routes.tags()}>
        <Icon
          className="mr-2"
          width="24"
          icon={tagsIcon}
          color={pathname === routes.tags() && TEXT_PRIMARY}
        />
        <FormattedMessage {...messages.tags} />
      </A1>

      <A1 to={routes.users()} disabled={pathname === routes.users()}>
        <Icon
          className="mr-2"
          width="24"
          icon={usersIcon}
          color={pathname === routes.users() && TEXT_PRIMARY}
        />
        <FormattedMessage {...messages.users} />
      </A1>

      <A1 to={routes.faq()} disabled={pathname === routes.faq()}>
        <Icon
          className="mr-2"
          width="24"
          icon={questionRoundedIcon}
          color={pathname === routes.faq() && TEXT_PRIMARY}
        />
        <FormattedMessage {...messages.faq} />
      </A1>
    </div>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
};

export default MainLinks;
