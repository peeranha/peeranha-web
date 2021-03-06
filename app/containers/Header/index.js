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

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { showLoginModal } from 'containers/Login/actions';
import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import { showLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import {
  WHAT_IS_ENERGY,
  HOW_TO_CHARGE,
  VALUE_OF_ACTIONS,
} from 'containers/Faq/constants';

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
      showLeftMenuDispatch,
      redirectToAskQuestionPageDispatch,
      faqQuestions,
      isMenuVisible,
    } = this.props;

    if (isMenuVisible) return null;

    return (
      <View
        account={account}
        profileInfo={profileInfo}
        showLoginModalDispatch={showLoginModalDispatch}
        showMenu={showLeftMenuDispatch}
        redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
        faqQuestions={faqQuestions}
      />
    );
  }
}

Header.propTypes = {
  showLoginModalDispatch: PropTypes.func,
  account: PropTypes.string,
  profileInfo: PropTypes.object,
  showLeftMenuDispatch: PropTypes.func,
  redirectToAskQuestionPageDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
  isMenuVisible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  profileInfo: makeSelectProfileInfo(),
  isMenuVisible: selectIsMenuVisible(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_ENERGY,
    HOW_TO_CHARGE,
    VALUE_OF_ACTIONS,
  ]),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    redirectToAskQuestionPageDispatch: bindActionCreators(
      redirectToAskQuestionPage,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
