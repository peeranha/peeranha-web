/**
 *
 * Header
 *
 */

import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import { makeSelectLocation } from 'containers/App/selectors';

import { showLoginModal } from 'containers/Login/actions';

import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';

import View from './View';
import { HEADER_ID } from './constants';

export class Header extends React.PureComponent {
  componentDidMount() /* istanbul ignore next */ {
    this.animate();
  }

  componentDidUpdate() {
    $(`#${HEADER_ID}`).removeClass('sticky');
    $(`#${LEFT_MENU_ID}`).removeClass('sticky');
  }

  animate = /* istanbul ignore next */ () => {
    let lastScrollTop = 0;

    window.addEventListener(
      'scroll',
      event => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        const { scrollY } = event.currentTarget;
        const { innerHeight } = window;

        if (scrollY > innerHeight) {
          if (st > lastScrollTop) {
            $(`#${HEADER_ID}`).addClass('sticky');
            $(`#${LEFT_MENU_ID}`).addClass('sticky');
          } else {
            $(`#${HEADER_ID}`).removeClass('sticky');
            $(`#${LEFT_MENU_ID}`).removeClass('sticky');
          }
        }

        lastScrollTop = st <= 0 ? 0 : st;
      },
      false,
    );
  };

  render() /* istanbul ignore next */ {
    const {
      account,
      profileInfo,
      showLoginModalDispatch,
      showMenu,
      expandLeftMenuNavigation,
    } = this.props;

    return (
      <View
        account={account}
        profileInfo={profileInfo}
        showLoginModalDispatch={showLoginModalDispatch}
        showMenu={showMenu}
        expandLeftMenuNavigation={expandLeftMenuNavigation}
      />
    );
  }
}

Header.propTypes = {
  showLoginModalDispatch: PropTypes.func,
  account: PropTypes.string,
  profileInfo: PropTypes.object,
  showMenu: PropTypes.func,
  expandLeftMenuNavigation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  profileInfo: makeSelectProfileInfo(),
  location: makeSelectLocation(),
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

export default compose(withConnect)(Header);
