import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { TEXT_LIGHT } from 'style-constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import closeIcon from 'images/close.svg?external';

import aiSearchReducer from 'containers/AISearch/reducer';
import { startOver } from 'containers/AISearch/actions';
import { selectChatStarted } from 'containers/AISearch/selectors';
import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { deleteQuestion } from 'containers/ViewQuestion/actions';
import reducer from 'containers/ViewQuestion/reducer';
import saga from 'containers/ViewQuestion/saga';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import {
  makeSelectProfileInfo,
  makeSelectBalance,
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
  makeSelectBoost,
  selectIsGlobalAdmin,
} from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { changeLocale as changeLocaleDispatch, showLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible, selectPinnedItemMenu } from 'containers/AppWrapper/selectors';
import { selectIsEditDocumentation } from 'pages/Documentation/selectors';
import { toggleEditDocumentation } from 'pages/Documentation/actions';

import Icon from 'components/Icon';

import View from './View';
import { Aside, After } from './Styles';

const LeftMenu = ({
  profile,
  isMenuVisible,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  boost,
  showLoginModalDispatch,
  showLeftMenuDispatch,
  isGlobalAdmin,
  changeLocale,
  locale,
  documentationMenu,
  redirectToEditQuestionPageDispatch,
  redirectToPostDocumentationPageDispatch,
  deleteQuestionDispatch,
  match,
  toggleEditDocumentationDispatch,
  isEditDocumentation,
  pinnedItemMenu,
  communities,
  startOverDispatch,
  chatStarted,
}) => (
  <Aside isMenuVisible={isMenuVisible} className={isMenuVisible ? 'd-flex' : 'd-none d-lg-block'}>
    <View
      isMenuVisible={isMenuVisible}
      profile={profile}
      balance={balance}
      stakedInCurrentPeriod={stakedInCurrentPeriod}
      stakedInNextPeriod={stakedInNextPeriod}
      boost={boost}
      showLoginModal={showLoginModalDispatch}
      isGlobalAdmin={isGlobalAdmin}
      changeLocale={changeLocale}
      locale={locale}
      documentationMenu={documentationMenu}
      redirectToEditQuestionPage={redirectToEditQuestionPageDispatch}
      redirectToPostDocumentationPage={redirectToPostDocumentationPageDispatch}
      deleteQuestion={deleteQuestionDispatch}
      match={match}
      toggleEditDocumentation={toggleEditDocumentationDispatch}
      isEditDocumentation={isEditDocumentation}
      pinnedItemMenu={pinnedItemMenu}
      communities={communities}
      startOverDispatch={startOverDispatch}
      chatStarted={chatStarted}
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
  boost: PropTypes.number,
  isMenuVisible: PropTypes.bool,
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
  communities: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
  isGlobalAdmin: selectIsGlobalAdmin(),
  balance: makeSelectBalance(),
  stakedInCurrentPeriod: makeSelectStakedInCurrentPeriod(),
  stakedInNextPeriod: makeSelectStakedInNextPeriod(),
  boost: makeSelectBoost(),
  isMenuVisible: selectIsMenuVisible(),
  locale: makeSelectLocale(),
  isEditDocumentation: selectIsEditDocumentation(),
  pinnedItemMenu: selectPinnedItemMenu(),
  communities: selectCommunities(),
  chatStarted: selectChatStarted(),
});

const withReducer = injectReducer({ key: 'viewQuestion', reducer });
const withSaga = injectSaga({
  key: 'viewQuestion',
  saga,
  disableEject: true,
});

export function mapDispatchToProps(dispatch) {
  return {
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    changeLocale: bindActionCreators(changeLocaleDispatch, dispatch),
    redirectToEditQuestionPageDispatch: bindActionCreators(redirectToEditQuestionPage, dispatch),
    redirectToPostDocumentationPageDispatch: bindActionCreators(
      redirectToAskQuestionPage,
      dispatch,
    ),
    deleteQuestionDispatch: bindActionCreators(deleteQuestion, dispatch),
    toggleEditDocumentationDispatch: bindActionCreators(toggleEditDocumentation, dispatch),
    startOverDispatch: bindActionCreators(startOver, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(LeftMenu);
