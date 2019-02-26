import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import H4 from 'components/H4';
import Base from 'components/Base';
import NavigationButton from 'components/Button/NavigationButton';
import A from 'components/A';

import profileMessages from 'containers/Profile/messages';

import QuestionsProfileTab from './QuestionsProfileTab';
import NoActivity from './NoActivity';

const Activity = /* istanbul ignore next */ ({
  userId,
  questions,
  questionsWithUserAnswers,
  questionsWithAnswersLoading,
  questionsLoading,
  locale,
}) => {
  const path = window.location.pathname + window.location.hash;
  const route = routes.profileView(userId);

  let myPosts = [];

  // concat 2 mass and sort by postTime and slice
  myPosts = window._.orderBy(
    questions.concat(questionsWithUserAnswers),
    y => y.myPostTime,
    ['desc'],
  ).slice(0, 10);

  if (!questionsWithAnswersLoading && !questionsLoading && !myPosts[0]) {
    return <NoActivity />;
  }

  return (
    <div>
      <H4 isHeader>
        <FormattedMessage {...profileMessages.activity} />
      </H4>

      <Base position="top">
        <A to={route} href={route} disabled={!myPosts.length}>
          <NavigationButton disabled={!myPosts.length} isLink={path !== route}>
            <FormattedMessage {...messages.posts} />
          </NavigationButton>
        </A>

        <A
          to={`${route}#activity#questions`}
          href={`${route}#activity#questions`}
          disabled={!questions.length}
        >
          <NavigationButton
            disabled={!questions.length}
            isLink={path !== `${route}#activity#questions`}
          >
            <FormattedMessage {...messages.questions} />
          </NavigationButton>
        </A>

        <A
          disabled={!questionsWithUserAnswers.length}
          to={`${route}#activity#answers`}
          href={`${route}#activity#answers`}
        >
          <NavigationButton
            disabled={!questionsWithUserAnswers.length}
            isLink={path !== `${route}#activity#answers`}
          >
            <FormattedMessage {...messages.answers} />
          </NavigationButton>
        </A>
      </Base>

      <Base position="bottom">
        <QuestionsProfileTab
          tab="posts"
          locale={locale}
          className={path === route ? '' : 'd-none'}
          questions={myPosts}
          loading={questionsWithAnswersLoading || questionsLoading}
        />

        <QuestionsProfileTab
          tab="questions"
          locale={locale}
          className={path === `${route}#activity#questions` ? '' : 'd-none'}
          questions={questions.slice(0, 10)}
          loading={questionsLoading}
        />

        <QuestionsProfileTab
          tab="answers"
          locale={locale}
          className={path === `${route}#activity#answers` ? '' : 'd-none'}
          questions={questionsWithUserAnswers.slice(0, 10)}
          loading={questionsWithAnswersLoading}
        />
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
};

export default Activity;
