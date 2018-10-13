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

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountInitializer/selectors';

import { getProfileInfo, setDefaultProps } from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as profileSelectors from './selectors';

import Preloader from './Preloader';
import Wrapper from './Wrapper';
import NoSuchUser from './NoSuchUser';

/* eslint-disable react/prefer-stateless-function */
export class Profile extends React.Component {
  componentDidMount = () => {
    const { userId, account } = this.props;
    this.props.getProfileInfoDispatch(userId, account.eosAccount);
  };

  componentWillUnmount() {
    this.props.setDefaultPropsDispatch();
  }

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
          {isProfileLoading && <Preloader />}
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
  children: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
  getProfileInfoDispatch: PropTypes.func.isRequired,
  setDefaultPropsDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  profile: profileSelectors.selectProfile(),
  isProfileLoading: profileSelectors.selectIsProfileLoading(),
});

function mapDispatchToProps(dispatch) {
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
