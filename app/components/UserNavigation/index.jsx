import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';
import { TEXT_PRIMARY, TEXT_SECONDARY, BORDER_PRIMARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import NavigationButton, {
  NavigationLink,
} from 'components/Button/Contained/Navigation';
import Wrapper from 'components/Header/Complex';
import Span from 'components/Span/index';
import A from 'components/A/index';
import { IconMd } from 'components/Icon/IconWithSizes';

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > * {
    flex-shrink: 0;
  }

  @media only screen and (max-width: 576px) {
    overflow: auto;
    display: flex;
  }
`;

const Div = styled.div`
  white-space: nowrap;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: ${({ isProfilePage = true }) => (isProfilePage ? '94%' : '100%')};

  @media only screen and (max-width: 767px) {
    max-width: 100%;
  }
`;

const hashes = ['#questions', '#answers', '#settings'];

const UserNavigation = ({
  userId,
  account,
  questionsLength,
  questionsWithUserAnswersLength,
  redirectToEditProfilePage,
}) => {
  const path = window.location.pathname + window.location.hash;
  const ref = useRef(null);

  useEffect(
    () => {
      if (
        hashes.includes(window.location.hash) ||
        path === routes.profileView(userId)
      ) {
        window.scrollTo(0, 0);
      }
    },
    [window.location.hash],
  );

  const isProfilePage =
    userId === account &&
    (path === routes.profileView(account) ||
      path === routes.userCommunities(account));

  return (
    <Wrapper position="top" ref={ref}>
      <Ul>
        <Div
          className="d-flex align-items-center"
          isProfilePage={isProfilePage}
        >
          <NavigationLink
            to={routes.profileView(userId)}
            isLink={
              path !== routes.profileView(userId) &&
              path !== routes.profileEdit(userId) &&
              path !== routes.userCommunities(userId)
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

          <NavigationLink
            className={userId !== account ? 'd-none' : ''}
            to={routes.userNotifications(userId)}
            isLink={path !== routes.userNotifications(userId)}
          >
            <FormattedMessage {...messages.notifications} />
          </NavigationLink>

          <NavigationLink
            className={userId !== account ? 'd-none' : ''}
            to={routes.userAchievements(userId)}
            isLink={path !== routes.userAchievements(userId)}
          >
            <FormattedMessage {...messages.achievements} />
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
        </Div>

        <div className="d-none d-md-block">
          <button
            onClick={redirectToEditProfilePage}
            className={`align-items-center ${
              isProfilePage ? 'd-inline-flex' : 'd-none'
            }`}
            id={`redireact-to-edit-${userId}-user-page-2`}
            data-user={userId}
          >
            <IconMd icon={pencilIcon} />
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
            <IconMd icon={closeIcon} fill={BORDER_PRIMARY} isColorImportant />
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
