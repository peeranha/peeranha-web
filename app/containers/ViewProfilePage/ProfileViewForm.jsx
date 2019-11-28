import React from 'react';
import PropTypes from 'prop-types';

import TopCommunities from 'components/TopCommunities';

import MainUserInformation from './MainUserInformation';
import AdditionalUserInformation from './AdditionalUserInformation';
import CommunitiesForm from './CommunitiesForm';
import Activity from './Activity';

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
}) => (
  <div className={className}>
    <MainUserInformation
      profile={profile}
      userId={userId}
      account={account}
      redirectToEditProfilePage={redirectToEditProfilePage}
    />

    <AdditionalUserInformation
      profile={profile}
      userId={userId}
      account={account}
    />

    <CommunitiesForm
      userId={userId}
      profile={profile}
      account={account}
      communities={communities}
    />

    <TopCommunities
      userId={userId}
      account={account}
      communities={communities}
      profile={profile}
    />

    <Activity
      account={account}
      userId={userId}
      questions={questions}
      questionsWithUserAnswers={questionsWithUserAnswers}
      questionsLoading={questionsLoading}
      questionsWithAnswersLoading={questionsWithAnswersLoading}
      locale={locale}
    />
  </div>
);

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
};

export default ProfileViewForm;
