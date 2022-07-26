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
import cn from 'classnames';

import CloseIcon from 'icons/Close';

import {
  makeSelectProfileInfo,
  makeSelectBalance,
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
  makeSelectBoost,
  selectIsGlobalAdmin,
} from 'containers/AccountProvider/selectors';

import { loginWithWallet } from 'containers/Login/actions';
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
      />

      <After isMenuVisible={isMenuVisible} onClick={showLeftMenuDispatch}>
        <CloseIcon fill={TEXT_LIGHT} size={[16, 16]} className={cn('cup')} />
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
