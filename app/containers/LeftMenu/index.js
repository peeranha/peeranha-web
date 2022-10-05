/**
 *
 * LeftMenu
 *
 */

import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { deleteQuestion } from 'containers/ViewQuestion/actions';
import reducer from 'containers/ViewQuestion/reducer';
import saga from 'containers/ViewQuestion/saga';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
  makeSelectBoost,
  selectIsGlobalAdmin,
} from 'containers/AccountProvider/selectors';
import { toggleEditDocumentation } from 'pages/Documentation/actions';

import { loginWithWallet, showLoginModal } from 'containers/Login/actions';
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
  documentationMenu,
  redirectToEditQuestionPageDispatch,
  redirectToPostDocumentationPageDispatch,
  deleteQuestionDispatch,
  match,
  toggleEditDocumentationDispatch,
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
        documentationMenu={documentationMenu}
        redirectToEditQuestionPage={redirectToEditQuestionPageDispatch}
        redirectToPostDocumentationPage={
          redirectToPostDocumentationPageDispatch
        }
        deleteQuestion={deleteQuestionDispatch}
        match={match}
        toggleEditDocumentation={toggleEditDocumentationDispatch}
      />

      <After isMenuVisible={isMenuVisible} onClick={showLeftMenuDispatch}>
        <Icon width="16" icon={closeIcon} color={TEXT_LIGHT} />
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
  boost: PropTypes.number,
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

const withReducer = injectReducer({ key: 'viewQuestion', reducer });
const withSaga = injectSaga({
  key: 'viewQuestion',
  saga,
  disableEject: true,
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    showLeftMenuDispatch: bindActionCreators(showLeftMenu, dispatch),
    redirectToEditQuestionPageDispatch: bindActionCreators(
      redirectToEditQuestionPage,
      dispatch,
    ),
    redirectToPostDocumentationPageDispatch: bindActionCreators(
      redirectToAskQuestionPage,
      dispatch,
    ),
    deleteQuestionDispatch: bindActionCreators(deleteQuestion, dispatch),
    toggleEditDocumentationDispatch: bindActionCreators(
      toggleEditDocumentation,
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(LeftMenu);
