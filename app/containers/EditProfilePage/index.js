/**
 *
 * EditProfilePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import _get from 'lodash/get';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { selectQuestions } from 'containers/QuestionsOfUser/selectors';
import { selectQuestionsWithUserAnswers } from 'containers/QuestionsWithAnswersOfUser/selectors';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
  makeSelectLoginData,
} from 'containers/AccountProvider/selectors';

import Profile from 'containers/Profile';
import UserNavigation from 'components/UserNavigation';

import * as editProfileSelectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import { setDefaultReducer, saveProfile } from './actions';

import ProfileEditForm from './ProfileEditForm';
import * as routes from '../../routes-config';

export const EditProfilePage = ({
  match: {
    params: { id },
  },
  profile,
  account,
  isProfileSaving,
  loginData,
  setDefaultReducerDispatch,
  saveProfileDispatch,
  history,
}) => {
  if (!profile) {
    history.push(routes.feed());
  }
  const saveProfileMethod = values =>
    saveProfileDispatch({
      userKey: id,
      profile: {
        ...profile.profile,
        ...values.toJS(),
      },
    });

  const sendProps = {
    saveProfile: saveProfileMethod,
    isProfileSaving,
    profile,
  };

  useEffect(() => setDefaultReducerDispatch, []);

  return (
    <Profile userId={id} isLogin={account === id}>
      <UserNavigation
        userId={id}
        account={account}
        profile={profile}
        questionsLength={_get(profile, 'postCount', 0)}
        questionsWithUserAnswersLength={_get(profile, 'answersGiven', 0)}
        loginData={loginData}
      />

      <ProfileEditForm {...sendProps} />
    </Profile>
  );
};

EditProfilePage.propTypes = {
  saveProfileDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
  profile: PropTypes.object,
  match: PropTypes.object,
  account: PropTypes.string,
  isProfileSaving: PropTypes.bool,
  questions: PropTypes.array,
  questionsWithUserAnswers: PropTypes.array,
  loginData: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    profile: makeSelectProfileInfo(),
    loginData: makeSelectLoginData(),
    account: makeSelectAccount(),
    isProfileSaving: editProfileSelectors.selectIsProfileSaving(),
    questions: selectQuestions(),
    questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
  }),
  dispatch => ({
    setDefaultReducerDispatch: bindActionCreators(setDefaultReducer, dispatch),
    saveProfileDispatch: bindActionCreators(saveProfile, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'editProfileReducer', reducer });
const withSaga = injectSaga({ key: 'editProfileReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditProfilePage);
