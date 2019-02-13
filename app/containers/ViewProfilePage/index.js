/**
 *
 * ViewProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Profile from 'containers/Profile';

import * as selectorsProfile from 'containers/Profile/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import TopCommunities from 'components/TopCommunities';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  selectQuestionsLoading,
  selectQuestions,
} from 'containers/QuestionsOfUser/selectors';
import {
  selectQuestionsLoading as selectQuestionsWithAnswersLoading,
  selectQuestionsWithUserAnswers,
} from 'containers/QuestionsWithAnswersOfUser/selectors';

import ProfileViewForm from './ProfileViewForm';
import CommunitiesForm from './CommunitiesForm';
import Activity from './Activity';

const ViewProfilePage = ({
  match,
  profile,
  account,
  communities,
  questions,
  questionsWithUserAnswers,
  questionsLoading,
  questionsWithAnswersLoading,
  locale,
}) => (
  <Profile userId={match.params.id}>
    <ProfileViewForm
      userId={match.params.id}
      profile={profile}
      account={account}
    />

    <CommunitiesForm
      userId={match.params.id}
      profile={profile}
      account={account}
      communities={communities}
    />

    <TopCommunities
      userId={match.params.id}
      account={account}
      communities={communities}
      profile={profile}
    />

    <Activity
      account={account}
      userId={match.params.id}
      questions={questions}
      questionsWithUserAnswers={questionsWithUserAnswers}
      questionsLoading={questionsLoading}
      questionsWithAnswersLoading={questionsWithAnswersLoading}
      locale={locale}
    />
  </Profile>
);

ViewProfilePage.propTypes = {
  profile: PropTypes.object,
  locale: PropTypes.string,
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
  profile: selectorsProfile.selectProfile(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  questions: selectQuestions(),
  questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
  questionsLoading: selectQuestionsLoading(),
  questionsWithAnswersLoading: selectQuestionsWithAnswersLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ViewProfilePage);
