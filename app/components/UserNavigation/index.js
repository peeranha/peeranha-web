import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import Ul from 'components/Ul';
import A from 'components/A';
import NavigationButton from 'components/Button/Contained/Navigation';
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
        <A to={routes.profileView(userId)} href={routes.profileView(userId)}>
          <NavigationButton
            isLink={
              path !== routes.profileView(userId) &&
              path !== routes.profileViewActivityQuestions(userId) &&
              path !== routes.profileViewActivityAnswers(userId) &&
              path !== routes.profileEdit(userId)
            }
          >
            <FormattedMessage {...messages.profile} />
          </NavigationButton>
        </A>

        <A
          disabled={!questionsLength}
          to={routes.userQuestions(userId)}
          href={routes.userQuestions(userId)}
        >
          <NavigationButton
            disabled={!questionsLength}
            isLink={path !== routes.userQuestions(userId)}
          >
            <FormattedMessage {...messages.questions} />
          </NavigationButton>
        </A>

        <A
          disabled={!questionsWithUserAnswersLength}
          to={routes.userAnswers(userId)}
          href={routes.userAnswers(userId)}
        >
          <NavigationButton
            disabled={!questionsWithUserAnswersLength}
            isLink={path !== routes.userAnswers(userId)}
          >
            <FormattedMessage {...messages.answers} />
          </NavigationButton>
        </A>

        <MyProfileButton
          userId={userId}
          account={account}
          href={routes.userSettings(userId)}
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
