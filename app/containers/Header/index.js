/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

import HeaderForm from './HeaderForm';

const Header = ({
  account,
  locale,
  profileInfo,
  showSignUpModalDispatch,
  showLoginModalDispatch,
}) => (
  <HeaderForm
    account={account}
    profileInfo={profileInfo}
    showSignUpModalDispatch={showSignUpModalDispatch}
    showLoginModalDispatch={showLoginModalDispatch}
    translations={translationMessages[locale]}
  />
);

Header.propTypes = {
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  account: PropTypes.string,
  locale: PropTypes.string,
  profileInfo: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  locale: makeSelectLocale(),
  profileInfo: makeSelectProfileInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
