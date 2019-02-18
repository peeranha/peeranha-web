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

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';

import HeaderForm from './HeaderForm';
import { HEADER_ID } from './constants';

class Header extends React.PureComponent {
  componentDidMount() {
    this.headerLeftMenuAnimation();
  }

  headerLeftMenuAnimation /* istanbul ignore next */ = () => {
    let lastScrollTop = 0;

    window.addEventListener(
      'scroll',
      event => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        const { scrollY } = event.currentTarget;
        const { innerHeight, $ } = window;

        if (scrollY > 0.5 * innerHeight) {
          if (st > lastScrollTop) {
            $(`#${LEFT_MENU_ID}`).addClass('scroll-hidden');
            $(`#${LEFT_MENU_ID}`).removeClass('scroll-visible');

            $(`#${HEADER_ID}`).addClass('scroll-hidden');
            $(`#${HEADER_ID}`).removeClass('scroll-visible');
          } else {
            $(`#${LEFT_MENU_ID}`).addClass('scroll-visible');
            $(`#${LEFT_MENU_ID}`).removeClass('scroll-hidden');

            $(`#${HEADER_ID}`).addClass('scroll-visible');
            $(`#${HEADER_ID}`).removeClass('scroll-hidden');
          }
        }

        lastScrollTop = st <= 0 ? 0 : st;
      },
      false,
    );
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
