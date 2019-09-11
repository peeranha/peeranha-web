/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as routes from 'routes-config';

import closeIcon from 'images/close.svg?external';
import Icon from 'components/Icon';

import {
  makeSelectProfileInfo,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import { selectPrivacyPolicy } from 'containers/PrivacyPolicy/selectors';
import { showLoginModal } from 'containers/Login/actions';

import ViewForPrivacyPolicy from 'containers/PrivacyPolicy/LeftMenu';

import View from './View';
import { Aside, After } from './Styles';

const LeftMenu = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  showMenu,
  privacyPolicy,
  balance,
  showLoginModalDispatch,
}) => {
  const { pathname } = window.location;

  return (
    <Aside
      isMenuVisible={isMenuVisible}
      className={`${isMenuVisible ? 'd-flex' : 'd-none d-lg-block'}`}
    >
      {pathname === routes.privacyPolicy() ? (
        <ViewForPrivacyPolicy
          isMenuVisible={isMenuVisible}
          privacyPolicy={privacyPolicy}
        />
      ) : (
        <View
          isMenuVisible={isMenuVisible}
          profile={profile}
          balance={balance}
          showLoginModal={showLoginModalDispatch}
        />
      )}

      <After isMenuVisible={isMenuVisible} onClick={showMenu}>
        <Icon width="16" icon={closeIcon} noMargin />
      </After>
    </Aside>
  );
};

LeftMenu.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showMenu: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  balance: PropTypes.number,
  privacyPolicy: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  privacyPolicy: selectPrivacyPolicy(),
  balance: makeSelectBalance(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LeftMenu);
