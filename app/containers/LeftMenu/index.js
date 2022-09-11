/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { TEXT_LIGHT } from 'style-constants';

import closeIcon from 'images/close.svg?external';
import Icon from 'components/Icon';

import {
  makeSelectProfileInfo,
  makeSelectBalance,
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
  makeSelectBoost,
  selectIsGlobalAdmin,
} from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { loginWithWallet } from 'containers/Login/actions';
import {
  changeLocale as changeLocaleDispatch,
  showLeftMenu,
} from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import View from './View';
import { Aside, After } from './Styles';

const LeftMenu = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  boost,
  loginWithWalletDispatch,
  showLeftMenuDispatch,
  isGlobalAdmin,
  changeLocale,
  locale,
}) => {
  const showLoginModal = () => {
    loginWithWalletDispatch({ metaMask: true });
  };

  return (
    <Aside
      isMenuVisible={isMenuVisible}
      className={isMenuVisible ? 'd-flex' : 'd-none d-lg-block'}
    >
      <View
        isMenuVisible={isMenuVisible}
        profile={profile}
        balance={balance}
        stakedInCurrentPeriod={stakedInCurrentPeriod}
        stakedInNextPeriod={stakedInNextPeriod}
        boost={boost}
        showLoginModal={showLoginModal}
        isGlobalAdmin={isGlobalAdmin}
        changeLocale={changeLocale}
        locale={locale}
      />

      <After isMenuVisible={isMenuVisible} onClick={showLeftMenuDispatch}>
        <Icon width="16" icon={closeIcon} color={TEXT_LIGHT} />
      </After>
    </Aside>
  );
};

LeftMenu.propTypes = {
  profile: PropTypes.object,
  loginWithWalletDispatch: PropTypes.func,
  showLeftMenuDispatch: PropTypes.func,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  boost: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  isGlobalAdmin: selectIsGlobalAdmin(),
  balance: makeSelectBalance(),
  stakedInCurrentPeriod: makeSelectStakedInCurrentPeriod(),
  stakedInNextPeriod: makeSelectStakedInNextPeriod(),
  boost: makeSelectBoost(),
  isMenuVisible: selectIsMenuVisible(),
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    changeLocale: bindActionCreators(changeLocaleDispatch, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LeftMenu);
