import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { NavigationLink } from 'components/Button/Contained/Navigation';
import Wrapper from 'components/Header/Complex';

const Ul = styled.ul`
  @media only screen and (max-width: 576px) {
    overflow: scroll;
    display: flex;
  }
`;

const UserNavigation = ({
  userId,
  account,
  questionsLength,
  questionsWithUserAnswersLength,
  loginData,
}) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <Ul>
        <NavigationLink
          to={routes.profileView(userId)}
          isLink={
            path !== routes.profileView(userId) &&
            path !== routes.profileViewActivityQuestions(userId) &&
            path !== routes.profileViewActivityAnswers(userId) &&
            path !== routes.profileEdit(userId)
          }
        >
          <FormattedMessage {...messages.profile} />
        </NavigationLink>

        <NavigationLink
          to={routes.userQuestions(userId)}
          disabled={!questionsLength}
          tabIndex={!questionsLength ? '-1' : undefined}
          isLink={path !== routes.userQuestions(userId)}
        >
          <FormattedMessage {...messages.questions} />
        </NavigationLink>

        <NavigationLink
          to={routes.userAnswers(userId)}
          disabled={!questionsWithUserAnswersLength}
          tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
          isLink={path !== routes.userAnswers(userId)}
        >
          <FormattedMessage {...messages.answers} />
        </NavigationLink>

        <NavigationLink
          className={
            userId !== account || loginData.loginWithScatter ? 'd-none' : ''
          }
          to={routes.userSettings(userId)}
          isLink={path !== routes.userSettings(userId)}
        >
          <FormattedMessage {...messages.settings} />
        </NavigationLink>
      </Ul>
    </Wrapper>
  );
};

UserNavigation.propTypes = {
  userId: PropTypes.string,
  account: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
  loginData: PropTypes.object,
};

export default UserNavigation;
