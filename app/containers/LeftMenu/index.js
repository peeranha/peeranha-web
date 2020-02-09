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
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';
import { showLeftMenu } from 'containers/AppWrapper/actions';

import View from './View';
import { Aside, After } from './Styles';

const LeftMenu = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  balance,
  showLoginModalDispatch,
  showLeftMenuDispatch,
}) => (
  <Aside
    isMenuVisible={isMenuVisible}
    className={isMenuVisible ? 'd-flex' : 'd-none d-lg-block'}
  >
    <View
      isMenuVisible={isMenuVisible}
      profile={profile}
      balance={balance}
      showLoginModal={showLoginModalDispatch}
    />

    <After isMenuVisible={isMenuVisible} onClick={showLeftMenuDispatch}>
      <Icon width="16" icon={closeIcon} color={TEXT_LIGHT} />
    </After>
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  showLeftMenuDispatch: PropTypes.func,
  balance: PropTypes.number,
  isMenuVisible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  balance: makeSelectBalance(),
  isMenuVisible: selectIsMenuVisible(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LeftMenu);
