import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import _orderBy from 'lodash/orderBy';

import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';

import H4 from 'components/H4';
import Base from 'components/Base';
import Span from 'components/Span';

import Button from 'components/Button/Contained/Navigation';
import { TransparentLinkDefault } from 'components/Button/Contained/Transparent';

import QuestionsProfileTab from './QuestionsProfileTab';
import Banner from './Banner';

const DEFAULT_NUMBER = 10;

const Activity = ({
  userId,
  questions,
  questionsWithUserAnswers,
  questionsWithAnswersLoading,
  questionsLoading,
  locale,
  profile,
}) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('posts');
  const myPosts = _orderBy(
    questions.concat(questionsWithUserAnswers),
    y => y.myPostTime,
    ['desc'],
  ).slice(0, DEFAULT_NUMBER);

  if (!questionsWithAnswersLoading && !questionsLoading && !myPosts[0]) {
    return <Banner />;
  }

  return (
    <div>
      <H4 isHeader>{t('profile.activity')}</H4>

      <Base position="top">
        <Button
          disabled={!myPosts.length}
          islink={tab !== 'posts'}
          onClick={() => setTab('posts')}
        >
          <Trans
            i18nKey="common.allActivitiesNumber"
            values={{ number: profile.postCount + profile.answersGiven }}
            components={[
              <Span
                className="ml-1"
                fontSize="14"
                color={tab !== 'posts' ? TEXT_SECONDARY : 'inherit'}
                key="0"
              />,
            ]}
          />
        </Button>

        <Button
          disabled={!questions.length}
          tabIndex={!questions.length ? '-1' : undefined}
          islink={tab !== 'quest'}
          onClick={() => setTab('quest')}
        >
          <Trans
            i18nKey="common.postsNumber"
            values={{
              number: (profile.postCount >= 0 && profile.postCount) || 0,
            }}
            components={[
              <Span
                className="ml-1"
                fontSize="14"
                color={tab !== 'quest' ? TEXT_SECONDARY : 'inherit'}
                key="0"
              />,
            ]}
          />
        </Button>

        <Button
          tabIndex={!questionsWithUserAnswers.length ? '-1' : undefined}
          disabled={!questionsWithUserAnswers.length}
          islink={tab !== 'answ'}
          onClick={() => setTab('answ')}
        >
          <Trans
            i18nKey="common.answersNumber"
            values={{
              number: profile.answersGiven,
            }}
            components={[
              <Span
                className="ml-1"
                fontSize="14"
                color={tab !== 'answ' ? TEXT_SECONDARY : 'inherit'}
                key="0"
              />,
            ]}
          />
        </Button>
      </Base>

      <Base position="bottom">
        <QuestionsProfileTab
          locale={locale}
          className={tab === 'posts' ? '' : 'd-none'}
          questions={myPosts}
          loading={questionsWithAnswersLoading || questionsLoading}
          userId={userId}
        />

        <QuestionsProfileTab
          locale={locale}
          className={tab === 'quest' ? '' : 'd-none'}
          questions={questions.slice(0, DEFAULT_NUMBER)}
          loading={questionsLoading}
          userId={userId}
        />

        <QuestionsProfileTab
          locale={locale}
          className={tab === 'answ' ? '' : 'd-none'}
          questions={questionsWithUserAnswers.slice(0, DEFAULT_NUMBER)}
          loading={questionsWithAnswersLoading}
          userId={userId}
        />

        {!questionsWithAnswersLoading &&
          !questionsLoading &&
          myPosts.length === DEFAULT_NUMBER && (
            <div className="mt-3">
              <Trans
                i18nKey="profile.seeMore"
                values={{
                  posts: t('common.posts'),
                  answers: t('common.answers'),
                }}
                components={[
                  <TransparentLinkDefault
                    className="d-inline text-lowercase"
                    href={routes.userQuestions(userId)}
                    disabled={!questions.length}
                    tabIndex={!questions.length ? '-1' : undefined}
                    key="0"
                  />,
                  <TransparentLinkDefault
                    className="d-inline text-lowercase"
                    href={routes.userAnswers(userId)}
                    disabled={!questionsWithUserAnswers.length}
                    tabIndex={
                      !questionsWithUserAnswers.length ? '-1' : undefined
                    }
                    key="1"
                  />,
                ]}
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
