import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import Ul from 'components/Ul';
import A from 'components/A';
import NavigationButton from 'components/Button/NavigationButton';
import Base from 'components/Base';

import MyProfileButton from './MyProfileButton';

const BaseStyled = Base.extend`
  margin-bottom: 0;
`.withComponent('header');

const Nav = Ul.extend`
  padding: 0;
  border-bottom: 0;
`.withComponent('nav');

const UserNavigation = /* istanbul ignore next */ ({
  userId,
  account,
  questionsLength,
  questionsWithUserAnswersLength,
}) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <BaseStyled position="top" className="d-flex justify-content-between">
      <Nav>
        <A to={routes.profile_view(userId)} href={routes.profile_view(userId)}>
          <NavigationButton
            isLink={
              path !== routes.profile_view(userId) &&
              path !== routes.profile_view_activity_questions(userId) &&
              path !== routes.profile_view_activity_answers(userId) &&
              path !== routes.profile_edit(userId)
            }
          >
            <FormattedMessage {...messages.profile} />
          </NavigationButton>
        </A>

        <A
          disabled={!questionsLength}
          to={routes.user_questions(userId)}
          href={routes.user_questions(userId)}
        >
          <NavigationButton
            disabled={!questionsLength}
            isLink={path !== routes.user_questions(userId)}
          >
            <FormattedMessage {...messages.questions} />
          </NavigationButton>
        </A>

        <A
          disabled={!questionsWithUserAnswersLength}
          to={routes.user_answers(userId)}
          href={routes.user_answers(userId)}
        >
          <NavigationButton
            disabled={!questionsWithUserAnswersLength}
            isLink={path !== routes.user_answers(userId)}
          >
            <FormattedMessage {...messages.answers} />
          </NavigationButton>
        </A>

        <MyProfileButton
          userId={userId}
          account={account}
          href={routes.user_settings(userId)}
        >
          <FormattedMessage {...messages.settings} />
        </MyProfileButton>
      </Nav>
    </BaseStyled>
  );
};

UserNavigation.propTypes = {
  userId: PropTypes.string,
  account: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
};

export default UserNavigation;
