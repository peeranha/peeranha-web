import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import Cookies from 'utils/cookies';

import A from 'components/A';
import NavigationButton from 'components/Button/Contained/Navigation';
import Wrapper from 'components/Header/Complex';

import { AUTH_TYPE, LOGIN_WITH_EMAIL } from 'containers/Login/constants';

const UserNavigation = ({
  userId,
  account,
  questionsLength,
  questionsWithUserAnswersLength,
}) => {
  const path = window.location.pathname + window.location.hash;

  const authType = Cookies.get(AUTH_TYPE);

  return (
    <Wrapper position="top">
      <ul>
        <A to={routes.profileView(userId)}>
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

        <A disabled={!questionsLength} to={routes.userQuestions(userId)}>
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
        >
          <NavigationButton
            disabled={!questionsWithUserAnswersLength}
            isLink={path !== routes.userAnswers(userId)}
          >
            <FormattedMessage {...messages.answers} />
          </NavigationButton>
        </A>

        <A
          className={
            userId !== account || authType !== LOGIN_WITH_EMAIL ? 'd-none' : ''
          }
          to={routes.userSettings(userId)}
        >
          <NavigationButton isLink={path !== routes.userSettings(userId)}>
            <FormattedMessage {...messages.settings} />
          </NavigationButton>
        </A>
      </ul>
    </Wrapper>
  );
};

UserNavigation.propTypes = {
  userId: PropTypes.string,
  account: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
};

export default UserNavigation;
