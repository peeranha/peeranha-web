/**
 *
 * Profile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { getProfileInfo, setDefaultProps } from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as profileSelectors from './selectors';

import Wrapper from './Wrapper';
import NoSuchUser from './NoSuchUser';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.Component {
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

  getProfile = (userId = this.props.userId) =>
    this.props.getProfileInfoDispatch(userId, this.props.account);

  render() {
    const { locale, profile, isProfileLoading } = this.props;

    const HelmetTitle = `${(profile.eos && profile.eos.display_name) ||
      translationMessages[locale][messages.wrongUser.id]} | ${
      translationMessages[locale][messages.profile.id]
    }`;

    return (
      <div className="container">
        <Helmet>
          <title>{HelmetTitle}</title>
          <meta
            name="description"
            content={
              translationMessages[locale][messages.profileDescription.id]
            }
          />
        </Helmet>
        <Wrapper>
          {isProfileLoading && <LoadingIndicator />}
          {!isProfileLoading && !profile.eos && <NoSuchUser />}
          {!isProfileLoading &&
            profile.eos &&
            React.Children.only(this.props.children)}
        </Wrapper>
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.object,
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
