/**
 *
 * EditProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

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

/* eslint-disable react/prefer-stateless-function */
export class EditProfilePage extends React.PureComponent {
  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  saveProfile = values => {
    const { match } = this.props;
    const userKey = match.params.id;

    const valJS = values.toJS();

    const profile = {
      ...this.props.profile.profile,
      ...valJS,
    };

    this.props.saveProfileDispatch({ profile, userKey });
  };

  render() /* istanbul ignore next */ {
    const { profile, match, account, isProfileSaving, loginData } = this.props;

    const sendProps = {
      saveProfile: this.saveProfile,
      isProfileSaving,
      profile,
    };

    return (
      <Profile userId={match.params.id}>
        <UserNavigation
          userId={match.params.id}
          account={account}
          questionsLength={profile ? profile.questions_asked : 0}
          questionsWithUserAnswersLength={profile ? profile.answers_given : 0}
          loginData={loginData}
        />

        <ProfileEditForm {...sendProps} />
      </Profile>
    );
  }
}

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

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  loginData: makeSelectLoginData(),
  account: makeSelectAccount(),
  isProfileSaving: editProfileSelectors.selectIsProfileSaving(),
  questions: selectQuestions(),
  questionsWithUserAnswers: selectQuestionsWithUserAnswers(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    setDefaultReducerDispatch: bindActionCreators(setDefaultReducer, dispatch),
    saveProfileDispatch: bindActionCreators(saveProfile, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editProfileReducer', reducer });
const withSaga = injectSaga({ key: 'editProfileReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditProfilePage);
