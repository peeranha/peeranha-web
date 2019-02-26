/**
 *
 * Header
 *
 */

import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import { makeSelectLocation } from 'containers/App/selectors';

import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';

import HeaderForm from './HeaderForm';
import { HEADER_ID } from './constants';

export class Header extends React.PureComponent {
  componentDidMount() /* istanbul ignore next */ {
    this.headerLeftMenuAnimation();
  }

  componentDidUpdate() /* istanbul ignore next */ {
    setTimeout(() => this.displayHeader(), 250);
  }

  headerLeftMenuAnimation = /* istanbul ignore next */ () => {
    let lastScrollTop = 0;

    window.addEventListener(
      'scroll',
      event => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        const { scrollY } = event.currentTarget;
        const { innerHeight } = window;

        if (scrollY > innerHeight) {
          if (st > lastScrollTop) {
            this.hideHeader();
          } else {
            this.displayHeader();
          }
        }

        lastScrollTop = st <= 0 ? 0 : st;
      },
      false,
    );
  };

  displayHeader = /* istanbul ignore next */ () => {
    $(`#${LEFT_MENU_ID}`).addClass('scroll-visible');
    $(`#${LEFT_MENU_ID}`).removeClass('scroll-hidden');

    $(`#${HEADER_ID}`).addClass('scroll-visible');
    $(`#${HEADER_ID}`).removeClass('scroll-hidden');
  };

  hideHeader = /* istanbul ignore next */ () => {
    $(`#${LEFT_MENU_ID}`).addClass('scroll-hidden');
    $(`#${LEFT_MENU_ID}`).removeClass('scroll-visible');

    $(`#${HEADER_ID}`).addClass('scroll-hidden');
    $(`#${HEADER_ID}`).removeClass('scroll-visible');
  };

  render() {
    const {
      account,
      profileInfo,
      showSignUpModalDispatch,
      showLoginModalDispatch,
      isMenuVisible,
      showMenu,
      expandLeftMenuNavigation,
    } = this.props;

    return (
      <HeaderForm
        account={account}
        profileInfo={profileInfo}
        showSignUpModalDispatch={showSignUpModalDispatch}
        showLoginModalDispatch={showLoginModalDispatch}
        isMenuVisible={isMenuVisible}
        showMenu={showMenu}
        expandLeftMenuNavigation={expandLeftMenuNavigation}
      />
    );
  }
}

Header.propTypes = {
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  account: PropTypes.string,
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
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
