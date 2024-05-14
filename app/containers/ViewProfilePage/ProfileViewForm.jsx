import React from 'react';
import PropTypes from 'prop-types';

import TopCommunities from 'components/TopCommunities';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import MainUserInformation from './MainUserInformation';
import AdditionalUserInformation from './AdditionalUserInformation';
import Activity from './Activity';
import * as routes from '../../routes-config';

const ProfileViewForm = ({
  profile,
  account,
  userId,
  communities,
  questions,
  questionsWithUserAnswers,
  questionsLoading,
  questionsWithAnswersLoading,
  locale,
  className,
  redirectToEditProfilePage,
  userAchievementsLength,
  banUser,
}) => {
  const path = window.location.pathname + window.location.hash;
  const isProfilePage =
    profile.id === account &&
    (path === routes.profileView(account) || path === routes.userCommunities(account));

  const onClickRedirectToEditProfilePage = ({ currentTarget: { id, user } }) => {
    redirectToEditProfilePage({
      buttonId: id,
      user,
    });
  };

  const singleCommunity = isSingleCommunityWebsite();

  const onClickBanUser = ({ currentTarget: { id } }) => {
    banUser({
      buttonId: id,
      user: userId,
      communityId: singleCommunity,
    });
  };

  return (
    <div className={className}>
      <MainUserInformation
        profile={profile}
        userId={userId}
        account={account}
        locale={locale}
        redirectToEditProfilePage={redirectToEditProfilePage}
        userAchievementsLength={userAchievementsLength}
        banUser={onClickBanUser}
      />

      <AdditionalUserInformation
        profile={profile}
        userId={userId}
        account={account}
        redirectToEditProfilePage={onClickRedirectToEditProfilePage}
        locale={locale}
      />

      {(isProfilePage || profile.ratings?.length > 0) && (
        <TopCommunities
          communities={communities}
          profile={profile}
          questions={questions}
          locale={locale}
        />
      )}

      <Activity
        account={account}
        userId={userId}
        questions={questions}
        questionsWithUserAnswers={questionsWithUserAnswers}
        questionsLoading={questionsLoading}
        questionsWithAnswersLoading={questionsWithAnswersLoading}
        locale={locale}
        profile={profile}
      />
    </div>
  );
};

ProfileViewForm.propTypes = {
  profile: PropTypes.object,
  account: PropTypes.string,
  userId: PropTypes.string,
  communities: PropTypes.array,
  questions: PropTypes.array,
  questionsWithUserAnswers: PropTypes.array,
  questionsLoading: PropTypes.bool,
  questionsWithAnswersLoading: PropTypes.bool,
  locale: PropTypes.string,
  className: PropTypes.string,
  redirectToEditProfilePage: PropTypes.func,
  userAchievementsLength: PropTypes.number,
};

export default ProfileViewForm;
