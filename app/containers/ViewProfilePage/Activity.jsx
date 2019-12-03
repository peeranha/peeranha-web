import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';

import H4 from 'components/H4';
import Base from 'components/Base';
import Span from 'components/Span';

import { NavigationLink } from 'components/Button/Contained/Navigation';
import { TransparentLinkDefault } from 'components/Button/Contained/Transparent';

import profileMessages from 'containers/Profile/messages';

import QuestionsProfileTab from './QuestionsProfileTab';
import Banner from './Banner';

const DEFAULT_NUMBER = 10;

/* eslint indent: 0 */
const Activity = ({
  userId,
  questions,
  questionsWithUserAnswers,
  questionsWithAnswersLoading,
  questionsLoading,
  locale,
  profile,
}) => {
  const path = window.location.pathname + window.location.hash;

  const profileViewRoute = routes.profileView(userId);
  const profileViewActivityQuestionsRoute = routes.profileViewActivityQuestions(
    userId,
  );
  const profileViewActivityAnswersRoute = routes.profileViewActivityAnswers(
    userId,
  );

  let myPosts = [];

  // concat 2 mass and sort by postTime and slice
  myPosts = window._.orderBy(
    questions.concat(questionsWithUserAnswers),
    y => y.myPostTime,
    ['desc'],
  ).slice(0, DEFAULT_NUMBER);

  if (!questionsWithAnswersLoading && !questionsLoading && !myPosts[0]) {
    return <Banner />;
  }

  return (
    <div>
      <H4 isHeader>
        <FormattedMessage {...profileMessages.activity} />
      </H4>

      <Base position="top">
        <NavigationLink
          to={profileViewRoute}
          disabled={!myPosts.length}
          isLink={path !== profileViewRoute}
        >
          <FormattedMessage
            {...messages.postsNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={path !== profileViewRoute ? TEXT_SECONDARY : 'inherit'}
                >
                  {profile.questions_asked + profile.answers_given}
                </Span>
              ),
            }}
          />
        </NavigationLink>

        <NavigationLink
          to={profileViewActivityQuestionsRoute}
          disabled={!questions.length}
          tabIndex={!questions.length ? '-1' : undefined}
          isLink={path !== profileViewActivityQuestionsRoute}
        >
          <FormattedMessage
            {...messages.questionsNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={
                    path !== profileViewActivityQuestionsRoute
                      ? TEXT_SECONDARY
                      : 'inherit'
                  }
                >
                  {profile.questions_asked}
                </Span>
              ),
            }}
          />
        </NavigationLink>

        <NavigationLink
          to={profileViewActivityAnswersRoute}
          tabIndex={!questionsWithUserAnswers.length ? '-1' : undefined}
          disabled={!questionsWithUserAnswers.length}
          isLink={path !== profileViewActivityAnswersRoute}
        >
          <FormattedMessage
            {...messages.answersNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={
                    path !== profileViewActivityAnswersRoute
                      ? TEXT_SECONDARY
                      : 'inherit'
                  }
                >
                  {profile.answers_given}
                </Span>
              ),
            }}
          />
        </NavigationLink>
      </Base>

      <Base position="bottom">
        <QuestionsProfileTab
          tab="posts"
          locale={locale}
          className={path === profileViewRoute ? '' : 'd-none'}
          questions={myPosts}
          loading={questionsWithAnswersLoading || questionsLoading}
        />

        <QuestionsProfileTab
          tab="questions"
          locale={locale}
          className={path === profileViewActivityQuestionsRoute ? '' : 'd-none'}
          questions={questions.slice(0, DEFAULT_NUMBER)}
          loading={questionsLoading}
        />

        <QuestionsProfileTab
          tab="answers"
          locale={locale}
          className={path === profileViewActivityAnswersRoute ? '' : 'd-none'}
          questions={questionsWithUserAnswers.slice(0, DEFAULT_NUMBER)}
          loading={questionsWithAnswersLoading}
        />

        {!questionsWithAnswersLoading &&
          !questionsLoading &&
          myPosts.length === DEFAULT_NUMBER && (
            <div className="mt-3">
              <FormattedMessage
                id={profileMessages.seeMore.id}
                values={{
                  questions: (
                    <TransparentLinkDefault
                      className="text-lowercase"
                      href={routes.userQuestions(userId)}
                      disabled={!questions.length}
                      tabIndex={!questions.length ? '-1' : undefined}
                    >
                      <FormattedMessage {...messages.questions} />
                    </TransparentLinkDefault>
                  ),
                  answers: (
                    <TransparentLinkDefault
                      className="text-lowercase"
                      href={routes.userAnswers(userId)}
                      disabled={!questionsWithUserAnswers.length}
                      tabIndex={
                        !questionsWithUserAnswers.length ? '-1' : undefined
                      }
                    >
                      <FormattedMessage {...messages.answers} />
                    </TransparentLinkDefault>
                  ),
                }}
              />
            </div>
          )}
      </Base>
    </div>
  );
};

Activity.propTypes = {
  userId: PropTypes.string,
  questions: PropTypes.array,
  questionsWithUserAnswers: PropTypes.array,
  questionsWithAnswersLoading: PropTypes.bool,
  questionsLoading: PropTypes.bool,
  locale: PropTypes.string,
  profile: PropTypes.object,
};

export default Activity;
