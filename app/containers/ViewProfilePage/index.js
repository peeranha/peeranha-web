/**
 *
 * ViewProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';

import Profile from 'containers/Profile';
import UserNavigation from 'components/UserNavigation';

import QuestionsOfUser from 'containers/QuestionsOfUser';
import QuestionsWithAnswersOfUser from 'containers/QuestionsWithAnswersOfUser';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectUsers,
} from 'containers/DataCacheProvider/selectors';

import {
  selectQuestionsLoading,
  selectQuestions,
} from 'containers/QuestionsOfUser/selectors';

import {
  selectQuestionsLoading as selectQuestionsWithAnswersLoading,
  selectQuestionsWithUserAnswers,
} from 'containers/QuestionsWithAnswersOfUser/selectors';

import { selectActivekey } from 'containers/ShowActiveKey/selectors';
import { selectOwnerKey } from 'containers/ShowOwnerKey/selectors';

import ProfileViewForm from './ProfileViewForm';
import SettingsOfUser from './SettingsOfUser';

const ViewProfilePage = /* istanbul ignore next */ ({
  match,
  profile,
  account,
  communities,
  questions,
  questionsWithUserAnswers,
  questionsLoading,
  questionsWithAnswersLoading,
  locale,
  activeKey,
  ownerKey,
}) => {
  const path = window.location.pathname + window.location.hash;
  const userId = match.params.id;

  return (
    <Profile userId={userId}>
      <UserNavigation
        userId={userId}
        account={account}
        questionsLength={profile ? profile.questions_asked : 0}
        questionsWithUserAnswersLength={profile ? profile.answers_given : 0}
      />

      <QuestionsOfUser
        className={path === routes.userQuestions(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userQuestions(userId)}
        userId={userId}
      />

      <QuestionsWithAnswersOfUser
        className={path === routes.userAnswers(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userAnswers(userId)}
        userId={userId}
      />

      <SettingsOfUser
        className={path === routes.userSettings(userId) ? '' : 'd-none'}
        userId={userId}
        locale={locale}
        activeKey={activeKey}
        ownerKey={ownerKey}
      />

      <ProfileViewForm
        className={
          path === routes.profileView(userId) ||
          path === routes.profileViewActivityQuestions(userId) ||
          path === routes.profileViewActivityAnswers(userId)
            ? ''
            : 'd-none'
        }
        userId={userId}
        profile={profile}
        account={account}
        communities={communities}
        questions={questions}
        questionsWithUserAnswers={questionsWithUserAnswers}
        questionsLoading={questionsLoading}
        questionsWithAnswersLoading={questionsWithAnswersLoading}
        locale={locale}
      />
    </Profile>
  );
};

ViewProfilePage.propTypes = {
  profile: PropTypes.object,
  locale: PropTypes.string,
  activeKey: PropTypes.string,
  ownerKey: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  communities: PropTypes.array,
  questions: PropTypes.array,
  questionsWithUserAnswers: PropTypes.array,
  questionsLoading: PropTypes.bool,
  questionsWithAnswersLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  profile: (state, props) => selectUsers(props.match.params.id)(state),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  questions: selectQuestions(),
  questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
  questionsLoading: selectQuestionsLoading(),
  questionsWithAnswersLoading: selectQuestionsWithAnswersLoading(),
  activekey: selectActivekey(),
  ownerKey: selectOwnerKey(),
});

export default connect(
  mapStateToProps,
  null,
)(ViewProfilePage);
