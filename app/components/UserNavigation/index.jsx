import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import closeIcon from 'images/closeCircle.svg?inline';

import NavigationButton, {
  NavigationLink,
} from 'components/Button/Contained/Navigation';

import Wrapper from 'components/Header/Complex';
import Span from 'components/Span/index';
import A from 'components/A/index';

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media only screen and (max-width: 576px) {
    overflow: auto;
    display: flex;

    > * {
      flex-shrink: 0;
    }
  }
`;

const UserNavigation = ({
  userId,
  account,
  questionsLength,
  questionsWithUserAnswersLength,
  redirectToEditProfilePage,
}) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <Ul>
        <div className="d-flex align-items-center">
          <NavigationLink
            to={routes.profileView(userId)}
            isLink={
              path !== routes.profileView(userId) &&
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
            <FormattedMessage
              {...messages.questionsNumber}
              values={{
                number: (
                  <Span
                    className="ml-1"
                    fontSize="14"
                    color={
                      path !== routes.userQuestions(userId)
                        ? TEXT_SECONDARY
                        : 'inherit'
                    }
                  >
                    {questionsLength}
                  </Span>
                ),
              }}
            />
          </NavigationLink>

          <NavigationLink
            to={routes.userAnswers(userId)}
            disabled={!questionsWithUserAnswersLength}
            tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
            isLink={path !== routes.userAnswers(userId)}
          >
            <FormattedMessage
              {...messages.answersNumber}
              values={{
                number: (
                  <Span
                    className="ml-1"
                    fontSize="14"
                    color={
                      path !== routes.userAnswers(userId)
                        ? TEXT_SECONDARY
                        : 'inherit'
                    }
                  >
                    {questionsWithUserAnswersLength}
                  </Span>
                ),
              }}
            />
          </NavigationLink>

          <NavigationLink
            className={userId !== account ? 'd-none' : ''}
            to={routes.userSettings(userId)}
            isLink={path !== routes.userSettings(userId)}
          >
            <FormattedMessage {...messages.settings} />
          </NavigationLink>

          <NavigationButton
            className={
              userId === account && path === routes.profileView(account)
                ? 'd-inline-flex d-md-none'
                : 'd-none'
            }
            onClick={redirectToEditProfilePage}
            id={`redireact-to-edit-${userId}-user-page-1`}
            data-user={userId}
            isLink
          >
            <FormattedMessage {...messages.edit} />
          </NavigationButton>
        </div>

        <div className="d-none d-md-block">
          <button
            onClick={redirectToEditProfilePage}
            className={`align-items-center ${
              userId === account && path === routes.profileView(account)
                ? 'd-inline-flex'
                : 'd-none'
            }`}
            id={`redireact-to-edit-${userId}-user-page-2`}
            data-user={userId}
          >
            <img src={pencilIcon} alt="icon" />
            <Span className="ml-1" color={TEXT_PRIMARY}>
              <FormattedMessage {...messages.edit} />
            </Span>
          </button>

          <A
            className={`align-items-center ${
              userId === account && path === routes.profileEdit(account)
                ? 'd-inline-flex'
                : 'd-none'
            }`}
            to={routes.profileView(account)}
          >
            <img src={closeIcon} alt="x" />
            <Span className="ml-1" color={TEXT_PRIMARY}>
              <FormattedMessage {...messages.close} />
            </Span>
          </A>
        </div>
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
  redirectToEditProfilePage: PropTypes.func,
};

export default UserNavigation;
