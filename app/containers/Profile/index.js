/**
 *
 * Profile
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { getProfileInfo, setDefaultProps } from './actions';
import * as profileSelectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import NoSuchUser from './NoSuchUser';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.PureComponent {
  componentWillUnmount = () => {
    this.props.setDefaultPropsDispatch();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.userId !== this.props.userId) {
      this.getProfile(nextProps.userId);
    }
  };

  componentDidMount = () => {
    this.getProfile();
  };

  getProfile = (userId = this.props.userId) => {
    this.props.getProfileInfoDispatch(userId, this.props.account);
  };

  render() {
    const { locale, profile, isProfileLoading } = this.props;

    const HelmetTitle = `${(profile && profile.display_name) ||
      translationMessages[locale][messages.wrongUser.id]} | ${
      translationMessages[locale][messages.profile.id]
    }`;

    return (
      <div>
        <Helmet>
          <title>{HelmetTitle}</title>
          <meta
            name="description"
            content={
              translationMessages[locale][messages.profileDescription.id]
            }
          />
        </Helmet>
        <div>
          {isProfileLoading && <LoadingIndicator />}

          {!isProfileLoading && !profile && <NoSuchUser />}

          {!isProfileLoading &&
            profile &&
            React.Children.only(this.props.children)}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
  profile: PropTypes.object,
  locale: PropTypes.string,
  isProfileLoading: PropTypes.bool,
  getProfileInfoDispatch: PropTypes.func,
  setDefaultPropsDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  profile: profileSelectors.selectProfile(),
  isProfileLoading: profileSelectors.selectIsProfileLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProfileInfoDispatch: (key, account) =>
      dispatch(getProfileInfo(key, account)),
    setDefaultPropsDispatch: () => dispatch(setDefaultProps()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profile);
