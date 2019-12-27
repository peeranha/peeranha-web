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
} from 'containers/AccountProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';

import View from './View';
import { Aside, After } from './Styles';

const LeftMenu = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  showMenu,
  balance,
  showLoginModalDispatch,
}) => (
  <Aside
    isMenuVisible={isMenuVisible}
    className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-block'}`}
  >
    <View
      isMenuVisible={isMenuVisible}
      profile={profile}
      balance={balance}
      showLoginModal={showLoginModalDispatch}
    />

    <After isMenuVisible={isMenuVisible} onClick={showMenu}>
      <Icon width="16" icon={closeIcon} color={TEXT_LIGHT} />
    </After>
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showMenu: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  balance: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  balance: makeSelectBalance(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LeftMenu);
