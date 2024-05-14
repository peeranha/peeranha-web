import { banUser } from 'containers/QuestionsWithAnswersOfUser/actions';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';
import Seo from 'components/Seo';
import { useTranslation } from 'react-i18next';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { redirectToEditProfilePage } from 'containers/EditProfilePage/actions';

import { DAEMON, isSuiBlockchain } from 'utils/constants';

import Profile from 'containers/Profile';
import Achievements from 'containers/Achievements';
import Moderation from 'containers/Moderation';
import Notifications from 'components/Notifications';
import UserNavigation from 'components/UserNavigation';
import QuestionsOfUser from 'containers/QuestionsOfUser';
import QuestionsWithAnswersOfUser from 'containers/QuestionsWithAnswersOfUser';
import { makeSelectAccount, makeSelectLoginData } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities, selectStat, selectUsers } from 'containers/DataCacheProvider/selectors';
import { selectQuestions, selectQuestionsLoading } from 'containers/QuestionsOfUser/selectors';
import {
  selectQuestionsLoading as selectQuestionsWithAnswersLoading,
  selectQuestionsWithUserAnswers,
} from 'containers/QuestionsWithAnswersOfUser/selectors';
import { getUserName } from 'utils/user';
import ProfileViewForm from './ProfileViewForm';
import SettingsOfUser from './SettingsOfUser';

import saga from '../QuestionsWithAnswersOfUser/saga';

import questionsWithAnswersOfUserReducer from '../QuestionsWithAnswersOfUser/reducer';
import questionsOfUserReducer from '../QuestionsOfUser/reducer';
import { selectUserAchievements } from '../Achievements/selectors';
import {
  getAllAchievements,
  getUserAchievements,
  resetViewProfileAccount,
  setViewProfileAccount,
} from '../Achievements/actions';
import { IS_MINTED_ACHIEVEMENT } from '../Achievements/constants';
import achievementsSaga from '../Achievements/saga';
import achievementsReducer from '../Achievements/reducer';

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
  stat,
  userAchievements,
  getAllAchievementsDispatch,
  setViewProfileAccountDispatch,
  resetViewProfileAccountDispatch,
  banUserDispatch,
}) => {
  const path = window.location.pathname + window.location.hash;
  const userId = match.params.id;

  const { t } = useTranslation();

  useEffect(() => {
    setViewProfileAccountDispatch(userId);
    getAllAchievementsDispatch();

    return () => resetViewProfileAccountDispatch();
  }, [userId]);

  const achievementsCount = () => {
    const mintedUserAchievements = isSuiBlockchain
      ? userAchievements?.filter((achievement) => achievement.isMinted === IS_MINTED_ACHIEVEMENT)
      : userAchievements;
    return account === profile?.user ? userAchievements?.length : mintedUserAchievements?.length;
  };

  return (
    <Profile userId={userId} isLogin={account === userId}>
      <Seo
        title={t('profile.profile')}
        description={t('profile.profile')}
        language={locale}
        index={false}
      />

      <UserNavigation
        userId={userId}
        account={account}
        profile={profile}
        loginData={loginData}
        questionsLength={profile?.postCount ?? 0}
        questionsWithUserAnswersLength={profile?.answersGiven ?? 0}
        userAchievementsLength={achievementsCount()}
        redirectToEditProfilePage={redirectToEditProfilePageDispatch}
      />

      <QuestionsOfUser
        className={path === routes.userQuestions(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userQuestions(userId)}
        displayName={getUserName(profile?.displayName, userId)}
        userId={userId}
      />

      <QuestionsWithAnswersOfUser
        className={path === routes.userAnswers(userId) ? '' : 'd-none'}
        infinityOff={path !== routes.userAnswers(userId)}
        displayName={getUserName(profile?.displayName, userId)}
        userId={userId}
      />

      <SettingsOfUser
        className={path === routes.userSettings(userId) ? 'mb-4' : 'd-none'}
        userId={userId}
        locale={locale}
        activeKey={activeKey}
        ownerKey={ownerKey}
        loginData={loginData}
        profile={profile}
        account={account}
        user={profile?.user ?? null}
        isAvailable={profile && account === profile.user}
      />

      {path === routes.userNotifications(userId) && (
        <Notifications
          className={path === routes.userNotifications(userId) ? '' : 'd-none'}
          isAvailable={account === profile?.user}
        />
      )}

      {path === routes.userNFTs(userId) && (
        <Achievements
          className={path === routes.userNFTs(userId) ? '' : 'd-none'}
          isAvailable={account === profile?.user}
          userId={userId}
        />
      )}

      {path === routes.userModeration(userId) && (
        <Moderation
          className={path === routes.userModeration(userId) ? '' : 'd-none'}
          userId={userId}
          account={account}
          profile={profile}
          loginData={loginData}
          isAvailable={account === profile?.user}
          communitiesCount={stat.communitiesCount}
        />
      )}

      <ProfileViewForm
        className={
          path === routes.profileView(userId) || path === routes.userCommunities(userId)
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
        userAchievementsLength={achievementsCount()}
        banUser={banUserDispatch}
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
  stat: PropTypes.object,
  userAchievements: PropTypes.array,
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
    stat: selectStat(),
    userAchievements: selectUserAchievements(),
  }),
  (dispatch) => ({
    redirectToEditProfilePageDispatch: bindActionCreators(redirectToEditProfilePage, dispatch),
    getAllAchievementsDispatch: bindActionCreators(getAllAchievements, dispatch),
    getUserAchievementsDispatch: bindActionCreators(getUserAchievements, dispatch),
    setViewProfileAccountDispatch: bindActionCreators(setViewProfileAccount, dispatch),
    resetViewProfileAccountDispatch: bindActionCreators(resetViewProfileAccount, dispatch),
    banUserDispatch: bindActionCreators(banUser, dispatch),
  }),
);

const withQuestionsWithAnswersReducer = injectReducer({
  key: 'questionsOfUser',
  reducer: questionsWithAnswersOfUserReducer,
});
const withQuestionsReducer = injectReducer({
  key: 'questionsOfUser',
  reducer: questionsOfUserReducer,
});

const withAchievementsReducer = injectReducer({
  key: 'userAchievements',
  reducer: achievementsReducer,
});
const withAchievementsSaga = injectSaga({
  key: 'userAchievements',
  saga: achievementsSaga,
});

const withSaga = injectSaga({ key: 'questionsOfUser', saga, mode: DAEMON });

export default compose(
  withQuestionsWithAnswersReducer,
  withQuestionsReducer,
  withAchievementsReducer,
  withAchievementsSaga,
  withSaga,
  withConnect,
)(ViewProfilePage);
