import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { loginWithSui, loginWithWallet, showLoginModal } from 'containers/Login/actions';
import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';
import { selectCommunities, selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import { showLeftMenu, changeLocale } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectIsEditDocumentation } from 'pages/Documentation/selectors';
import { toggleEditDocumentation } from 'pages/Documentation/actions';

import { WHAT_IS_ENERGY, HOW_TO_CHARGE, VALUE_OF_ACTIONS } from 'containers/Faq/constants';
import { isSuiBlockchain } from 'utils/sui/sui';

import View from './View';
import { HEADER_ID } from './constants';
import {
  selectTransactionHash,
  selectTransactionInPending,
  selectTransactionInitialised,
} from '../EthereumProvider/selectors';

export class Header extends React.PureComponent {
  componentDidMount() /* istanbul ignore next */ {
    this.animate();
  }

  componentDidUpdate() {
    const header = document.querySelector(`#${HEADER_ID}`);
    const leftMenu = document.querySelector(`#${LEFT_MENU_ID}`);

    if (header && leftMenu) {
      header.classList.remove('sticky');
      leftMenu.classList.remove('sticky');
    }
  }

  animate = /* istanbul ignore next */ () => {
    let lastScrollTop = 0;

    window.addEventListener(
      'scroll',
      (event) => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        const { scrollY } = event.currentTarget;
        const { innerHeight } = window;

        if (scrollY > innerHeight) {
          if (st > lastScrollTop) {
            document.querySelector(`#${HEADER_ID}`).classList.add('sticky');
            document.querySelector(`#${LEFT_MENU_ID}`).classList.add('sticky');
          } else {
            document.querySelector(`#${HEADER_ID}`).classList.remove('sticky');
            document.querySelector(`#${LEFT_MENU_ID}`).classList.remove('sticky');
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
      showLeftMenuDispatch,
      redirectToAskQuestionPageDispatch,
      faqQuestions,
      isMenuVisible,
      loginWithWalletDispatch,
      isTransactionInPending,
      transactionHash,
      transactionInitialised,
      locale,
      isEditDocumentation,
      toggleEditDocumentationDispatch,
      changeLocale,
      communities,

      loginWithSuiDispatch,
    } = this.props;

    const loginDispatch = isSuiBlockchain() ? loginWithSuiDispatch : loginWithWalletDispatch;

    if (isMenuVisible) return null;

    return (
      <View
        account={account}
        profileInfo={profileInfo}
        loginWithWalletDispatch={loginDispatch}
        showLoginModalWithRedirectToAskQuestionPage={() => loginDispatch(true)}
        showMenu={showLeftMenuDispatch}
        redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
        faqQuestions={faqQuestions}
        isTransactionInPending={isTransactionInPending}
        transactionHash={transactionHash}
        transactionInitialised={transactionInitialised}
        locale={locale}
        isEditDocumentation={isEditDocumentation}
        toggleEditDocumentation={toggleEditDocumentationDispatch}
        changeLocale={changeLocale}
        communities={communities}
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
  communities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  profileInfo: makeSelectProfileInfo(),
  isMenuVisible: selectIsMenuVisible(),
  faqQuestions: selectFaqQuestions([WHAT_IS_ENERGY, HOW_TO_CHARGE, VALUE_OF_ACTIONS]),
  isTransactionInPending: selectTransactionInPending(),
  transactionHash: selectTransactionHash(),
  transactionInitialised: selectTransactionInitialised(),
  locale: makeSelectLocale(),
  isEditDocumentation: selectIsEditDocumentation(),
  communities: selectCommunities(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    redirectToAskQuestionPageDispatch: bindActionCreators(redirectToAskQuestionPage, dispatch),
    toggleEditDocumentationDispatch: bindActionCreators(toggleEditDocumentation, dispatch),
    changeLocale: bindActionCreators(changeLocale, dispatch),

    loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Header);
