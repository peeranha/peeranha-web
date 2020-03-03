import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { getQuestions as getQuestionsWithAnsw } from 'containers/QuestionsWithAnswersOfUser/actions';
import { getQuestions } from 'containers/QuestionsOfUser/actions';

import {
  makeSelectAccount,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import { getUserProfile } from 'containers/DataCacheProvider/actions';

import {
  selectUsers,
  selectUsersLoading,
} from 'containers/DataCacheProvider/selectors';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.PureComponent {
  componentDidMount() {
    this.fetch(this.props.userId);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.userId !== this.props.userId) {
      this.fetch(nextProps.userId);
    }
  };

  fetch = userId => {
    this.props.getUserProfileDispatch(userId, true);
    this.props.getQuestionsDispatch(userId, true);
    this.props.getQuestionsWithAnswDispatch(userId, true);
  };

  render() {
    const {
      locale,
      children,
      isProfileLoading,
      accountLoading,
      profile,
    } = this.props;

    const translations = translationMessages[locale];

    const HelmetTitle = `${(profile && profile.display_name) ||
      translations[messages.wrongUser.id]} | ${
      translations[messages.profile.id]
    }`;

    let keywords = [];

    if (profile && profile.profile) {
      keywords = Object.values(profile.profile);
    }

    return (
      <div>
        <Seo
          title={HelmetTitle}
          description={translations[messages.profileDescription.id]}
          language={locale}
          keywords={keywords}
        />

        <div>
          {(isProfileLoading || accountLoading) &&
            !profile && <LoadingIndicator />}

          {profile && children}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.array,
  userId: PropTypes.string,
  profile: PropTypes.object,
  locale: PropTypes.string,
  isProfileLoading: PropTypes.bool,
  accountLoading: PropTypes.bool,
  getUserProfileDispatch: PropTypes.func,
  getQuestionsDispatch: PropTypes.func,
  getQuestionsWithAnswDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  isProfileLoading: selectUsersLoading(),
  accountLoading: makeSelectAccountLoading(),
  profile: (state, props) => selectUsers(props.userId)(state),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getUserProfileDispatch: bindActionCreators(getUserProfile, dispatch),
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    getQuestionsWithAnswDispatch: bindActionCreators(
      getQuestionsWithAnsw,
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
