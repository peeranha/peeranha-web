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

import { loginWithWallet, showLoginModal } from 'containers/Login/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';
import { showLeftMenu } from 'containers/AppWrapper/actions';

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
}) => (
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
      showLoginModal={() => loginWithWalletDispatch({ metaMask: true })}
      isGlobalAdmin={isGlobalAdmin}
    />

    <After isMenuVisible={isMenuVisible} onClick={showLeftMenuDispatch}>
      <Icon width="16" icon={closeIcon} color={TEXT_LIGHT} />
    </After>
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
  loginWithWalletDispatch: PropTypes.func,
  showLeftMenuDispatch: PropTypes.func,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  boost: PropTypes.object,
  isMenuVisible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  isGlobalAdmin: selectIsGlobalAdmin(),
  balance: makeSelectBalance(),
  stakedInCurrentPeriod: makeSelectStakedInCurrentPeriod(),
  stakedInNextPeriod: makeSelectStakedInNextPeriod(),
  boost: makeSelectBoost(),
  isMenuVisible: selectIsMenuVisible(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LeftMenu);
