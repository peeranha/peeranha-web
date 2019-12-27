import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';

import H4 from 'components/H4';
import Base from 'components/Base';
import Span from 'components/Span';

import Button from 'components/Button/Contained/Navigation';
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
  // concat 2 mass and sort by postTime and slice
  const myPosts = window._.orderBy(
    questions.concat(questionsWithUserAnswers),
    y => y.myPostTime,
    ['desc'],
  ).slice(0, DEFAULT_NUMBER);

  if (!questionsWithAnswersLoading && !questionsLoading && !myPosts[0]) {
    return <Banner />;
  }

  const [tab, setTab] = useState('posts');

  return (
    <div>
      <H4 isHeader>
        <FormattedMessage {...profileMessages.activity} />
      </H4>

      <Base position="top">
        <Button
          disabled={!myPosts.length}
          isLink={tab !== 'posts'}
          onClick={() => setTab('posts')}
        >
          <FormattedMessage
            {...messages.postsNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={tab !== 'posts' ? TEXT_SECONDARY : 'inherit'}
                >
                  {profile.questions_asked + profile.answers_given}
                </Span>
              ),
            }}
          />
        </Button>

        <Button
          disabled={!questions.length}
          tabIndex={!questions.length ? '-1' : undefined}
          isLink={tab !== 'quest'}
          onClick={() => setTab('quest')}
        >
          <FormattedMessage
            {...messages.questionsNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={tab !== 'quest' ? TEXT_SECONDARY : 'inherit'}
                >
                  {profile.questions_asked}
                </Span>
              ),
            }}
          />
        </Button>

        <Button
          tabIndex={!questionsWithUserAnswers.length ? '-1' : undefined}
          disabled={!questionsWithUserAnswers.length}
          isLink={tab !== 'answ'}
          onClick={() => setTab('answ')}
        >
          <FormattedMessage
            {...messages.answersNumber}
            values={{
              number: (
                <Span
                  className="ml-1"
                  fontSize="14"
                  color={tab !== 'answ' ? TEXT_SECONDARY : 'inherit'}
                >
                  {profile.answers_given}
                </Span>
              ),
            }}
          />
        </Button>
      </Base>

      <Base position="bottom">
        <QuestionsProfileTab
          locale={locale}
          className={tab === 'posts' ? '' : 'd-none'}
          questions={myPosts}
          loading={questionsWithAnswersLoading || questionsLoading}
        />

        <QuestionsProfileTab
          locale={locale}
          className={tab === 'quest' ? '' : 'd-none'}
          questions={questions.slice(0, DEFAULT_NUMBER)}
          loading={questionsLoading}
        />

        <QuestionsProfileTab
          locale={locale}
          className={tab === 'answ' ? '' : 'd-none'}
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
                      className="d-inline text-lowercase"
                      href={routes.userQuestions(userId)}
                      disabled={!questions.length}
                      tabIndex={!questions.length ? '-1' : undefined}
                    >
                      <FormattedMessage {...messages.questions} />
                    </TransparentLinkDefault>
                  ),
                  answers: (
                    <TransparentLinkDefault
                      className="d-inline text-lowercase"
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
