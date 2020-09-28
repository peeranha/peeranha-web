import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import Profile from 'containers/Profile';
import Achievements from 'containers/Achievements';
import Notifications from 'components/Notifications';
import UserNavigation from 'components/UserNavigation';

import QuestionsOfUser from 'containers/QuestionsOfUser';
import QuestionsWithAnswersOfUser from 'containers/QuestionsWithAnswersOfUser';

import {
  makeSelectAccount,
  makeSelectLoginData,
} from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectGetUserTgData,
  selectUsers,
} from 'containers/DataCacheProvider/selectors';

import {
  selectQuestions,
  selectQuestionsLoading,
} from 'containers/QuestionsOfUser/selectors';

import {
  selectQuestionsLoading as selectQuestionsWithAnswersLoading,
  selectQuestionsWithUserAnswers,
} from 'containers/QuestionsWithAnswersOfUser/selectors';

import {
  redirectToEditProfilePage,
  confirmTgAccount,
  unlinkTgAccount,
} from 'containers/EditProfilePage/actions';

import { selectActiveKey } from 'containers/ShowActiveKey/selectors';
import { selectOwnerKey } from 'containers/ShowOwnerKey/selectors';

import ProfileViewForm from './ProfileViewForm';
import SettingsOfUser from './SettingsOfUser';
import saga from '../QuestionsWithAnswersOfUser/saga';
import questionsWithAnswersOfUserReducer from '../QuestionsWithAnswersOfUser/reducer';
import questionsOfUserReducer from '../QuestionsOfUser/reducer';

const ViewProfilePage = ({
  match,
  loginData,
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
  redirectToEditProfilePageDispatch,
  userTgData,
}) => {
  const path = window.location.pathname + window.location.hash;
  const userId = match.params.id;

  return (
    <Profile userId={userId}>
      <UserNavigation
        userId={userId}
        account={account}
        loginData={loginData}
        questionsLength={profile?.questions_asked ?? 0}
        questionsWithUserAnswersLength={profile?.answers_given ?? 0}
        redirectToEditProfilePage={redirectToEditProfilePageDispatch}
      />

      <QuestionsOfUser
        className={path === routes.userQuestions(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userQuestions(userId)}
        displayName={profile?.display_name}
        userId={userId}
      />

      <QuestionsWithAnswersOfUser
        className={path === routes.userAnswers(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userAnswers(userId)}
        displayName={profile?.display_name}
        userId={userId}
      />

      <SettingsOfUser
        className={path === routes.userSettings(userId) ? '' : 'd-none'}
        userId={userId}
        locale={locale}
        activeKey={activeKey}
        ownerKey={ownerKey}
        loginData={loginData}
        profile={profile}
        account={account}
        user={profile?.user ?? null}
        isAvailable={profile && account === profile.user}
        tgData={userTgData}
      />

      {path === routes.userNotifications(userId) && (
        <Notifications
          className={path === routes.userNotifications(userId) ? '' : 'd-none'}
          isAvailable={account === profile?.user}
        />
      )}

      {path === routes.userAchievements(userId) && (
        <Achievements
          className={path === routes.userAchievements(userId) ? '' : 'd-none'}
          isAvailable={account === profile?.user}
        />
      )}

      <ProfileViewForm
        className={
          path === routes.profileView(userId) ||
          path === routes.userCommunities(userId)
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
        redirectToEditProfilePage={redirectToEditProfilePageDispatch}
      />
    </Profile>
  );
};

ViewProfilePage.propTypes = {
  loginData: PropTypes.object,
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
  redirectToEditProfilePageDispatch: PropTypes.func,
  userTgData: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    loginData: makeSelectLoginData(),
    profile: (state, props) => selectUsers(props.match.params.id)(state),
    account: makeSelectAccount(),
    communities: selectCommunities(),
    questions: selectQuestions(),
    questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
    questionsLoading: selectQuestionsLoading(),
    questionsWithAnswersLoading: selectQuestionsWithAnswersLoading(),
    activeKey: selectActiveKey(),
    ownerKey: selectOwnerKey(),
    userTgData: selectGetUserTgData(),
  }),
  dispatch => ({
    redirectToEditProfilePageDispatch: bindActionCreators(
      redirectToEditProfilePage,
      dispatch,
    ),
  }),
);

const key = 'questionsOfUser';
const withQuestionsWithAnswersReducer = injectReducer({
  key,
  reducer: questionsWithAnswersOfUserReducer,
});
const withQuestionsReducer = injectReducer({
  key,
  reducer: questionsOfUserReducer,
});

const withSaga = injectSaga({ key, saga, mode: DAEMON });

export default compose(
  withQuestionsWithAnswersReducer,
  withQuestionsReducer,
  withSaga,
  withConnect,
)(ViewProfilePage);
